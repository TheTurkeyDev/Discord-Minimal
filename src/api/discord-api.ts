import fetch, { RequestInit, Response } from 'node-fetch';
import { Snowflake } from '../custom-types';
import {
    DiscordAPIError,
    DiscordChannel,
    DiscordMessageEdit,
    DiscordInteractionResponse,
    DiscordMessageCreate,
    DiscordMessage,
    DiscordGatewayBotInfo,
    DiscordApplicationCommand,
    DiscordInteractionResponseMessageData
} from '../data-objects';
import { RateLimitBucket } from './rate-limit-bucket';
import DiscordMinimal from '../discord-minimal';
import { MultiPartForm } from './multi-part-form';

export const APIVersion = 10;
const URL_BASE = `https://discord.com/api/v${APIVersion}`;

let requestQueue = Promise.resolve();
let requestQueueLen = 0;

const bucketMap: { [key: string]: RateLimitBucket } = {};

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendFetch(topLvlUrl: string, url: string, init?: RequestInit | undefined): Promise<Response> {
    return new Promise<Response>((resolve, reject) =>
        queueReq(topLvlUrl + url, topLvlUrl + url + '/' + (init?.method ?? 'GET'), resolve, reject, init));
}

function queueReq(
    url: string,
    urlGroup: string,
    resolve: (value: Response | PromiseLike<Response>) => void,
    reject: (reason?: any) => void, init?: RequestInit | undefined
) {
    requestQueueLen++;
    requestQueue = requestQueue.then(
        async () => await processQueue(url, urlGroup, resolve, reject, init)
    ).finally(() => requestQueueLen--);
}

async function processQueue(
    url: string,
    urlGroup: string,
    resolve: (value: Response | PromiseLike<Response>) => void,
    reject: (reason?: any) => void,
    init?: RequestInit | undefined
) {
    if (bucketMap[urlGroup]) {
        const bucketInfo = bucketMap[urlGroup];
        if (bucketInfo.remain == 0) {
            const now = Date.now();
            if (now <= (bucketInfo.resetTime + 2) * 1000) {
                const holdTime = ((bucketInfo.resetTime + 2) * 1000) - now;
                setTimeout(() => {
                    queueReq(url, urlGroup, resolve, reject, init);
                }, holdTime);
                return;
            }
        }
    }

    let globalWait = -1;
    const resp = await fetch(`${URL_BASE}${url}`, init).then(async (r) => {
        const bucket = r.headers.get('x-ratelimit-bucket');

        const oldBucket = bucketMap[urlGroup]?.bucket;

        bucketMap[urlGroup] = {
            bucket: bucket,
            limit: parseInt(r.headers.get('x-ratelimit-limit') ?? '0'),
            remain: parseInt(r.headers.get('x-ratelimit-remaining') ?? '0'),
            resetTime: parseInt(r.headers.get('x-ratelimit-reset') ?? '0'),
            resetAfter: parseInt(r.headers.get('x-ratelimit-reset-after') ?? '0'),
        };

        if (oldBucket && oldBucket !== bucket)
            console.log('ERROR! Bucket mismatch! ', urlGroup, bucketMap[urlGroup].bucket, bucket);

        if (r.headers.get('X-RateLimit-Global'))
            await resp.json().then(json => globalWait = json.retry_after * 1000);
        if (r.headers.get('X-RateLimit-Scope')) {
            console.log('Rate limit! ', r.headers.get('X-RateLimit-Scope'));
            console.log('\tInfo: ', bucketMap[urlGroup]);
            console.log('\tReq: ', `${URL_BASE}${url}`);
            console.log('\tGroup: ', urlGroup);
        }

        return r;
    });

    if (globalWait != -1)
        await timeout(globalWait);

    resolve(resp);
}

async function makeFetch<T>(
    topLvlUrl: string,
    urlExtra: string,
    method: string,
    construct: (json: any) => T,
    body?: string
): Promise<T> {
    const resp = await sendFetch(topLvlUrl, urlExtra, {
        method: method,
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: body
    });
    const json = await resp.json();

    if (resp.ok)
        return construct(json);
    throw new DiscordAPIError(json.code, json.message, json.errors, method, `${topLvlUrl}${urlExtra}`);
}

export async function getGatewayBot(): Promise<DiscordGatewayBotInfo> {
    const url = '/gateway/bot';
    return makeFetch(url, '', 'GET', json => new DiscordGatewayBotInfo(json));
}

function genFormData(resp: DiscordInteractionResponse, respData: DiscordInteractionResponseMessageData) {
    const data = new MultiPartForm();
    data.addPart('payload_json', 'application/json', JSON.stringify({
        ...resp,
        data: {
            ...resp.data,
            files: undefined
        }
    }));

    for (let i = 0; i < (respData.files.length ?? 0); i++) {
        data.addPart(`files[${i}]`, 'text/plain', 'Testing123...', respData.attachments[i].filename);
    }
    console.log(data.generateBody());
    return data.generateBody();
}

export async function interactionCallback(
    interactionId: Snowflake,
    interactionToken: string,
    data: DiscordInteractionResponse
): Promise<void> {
    const url = `${URL_BASE}/interactions/${interactionId}/${interactionToken}/callback`;
    const hasFiles = !!data.data &&
        data.data instanceof DiscordInteractionResponseMessageData &&
        (data.data.files.length ?? 0) > 0;
    const body = hasFiles ? genFormData(data, data.data as DiscordInteractionResponseMessageData) : JSON.stringify(data);
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': hasFiles ? 'multipart/form-data' : 'application/json',
        },
        body: body,
    });

    if (!resp.ok) {
        const json = await resp.json();
        throw new DiscordAPIError(json.code, json.message, json.errors, 'POST', url);
    }
}

export async function createMessage(channelId: Snowflake, message: DiscordMessageCreate): Promise<DiscordMessage> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, '', 'POST', DiscordMessage.fromJson, JSON.stringify(message));
}

export async function editMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    message: DiscordMessageEdit
): Promise<DiscordMessage> {
    const url = `/channels/${channelId}/messages/${messageId}`;
    return makeFetch(url, '', 'PATCH', DiscordMessage.fromJson, JSON.stringify(message));
}

export async function addReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): Promise<void> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, `/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`, 'PUT', () => { });
}

export async function deleteUserReaction(
    channelId: Snowflake,
    messageId: Snowflake,
    emoji: string,
    userId: Snowflake
): Promise<void> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, `/${messageId}/reactions/${encodeURIComponent(emoji)}/${userId}`, 'DELETE', () => { });
}

export async function deleteAllReactions(channelId: Snowflake, messageId: Snowflake): Promise<void> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, `/${messageId}/reactions`, 'DELETE', () => { });
}

export async function createGlobalApplicationCommand(command: DiscordApplicationCommand): Promise<void> {
    const url = `/applications/${command.application_id}/commands`;
    return makeFetch(url, '', 'POST', () => { }, JSON.stringify(command));
}

export async function deleteGlobalApplicationCommand(applicationId: Snowflake, commandId: Snowflake): Promise<void> {
    const url = `/applications/${applicationId}/commands`;
    return makeFetch(url, `/${commandId}`, 'DELETE', () => { });
}

export async function createGuildApplicationCommand(command: DiscordApplicationCommand): Promise<void> {
    const url = `/applications/${command.application_id}/guilds/${command.guild_id}/commands`;
    return makeFetch(url, '', 'POST', () => { }, JSON.stringify(command));
}

export async function deleteGuildApplicationCommand(appId: Snowflake, guildId: Snowflake, cmdId: Snowflake): Promise<void> {
    const url = `/applications/${appId}/guilds/${guildId}/commands`;
    return makeFetch(url, `/${cmdId}`, 'DELETE', () => { });
}

export async function startThreadFromMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    name: string,                   // 1-100 character channel name
    autoArchiveDuration?: number,   // The thread will stop showing in the channel list after auto_archive_duration minutes of inactivity, can be set to: 60, 1440, 4320, 10080
    rateLimitPerUser?: number       // Amount of seconds a user has to wait before sending another message (0-21600)
): Promise<DiscordChannel> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, `/${messageId}/threads`, 'POST', DiscordChannel.fromJson, JSON.stringify({
        name,
        auto_archive_duration: autoArchiveDuration,
        rate_limit_per_user: rateLimitPerUser
    }));
}