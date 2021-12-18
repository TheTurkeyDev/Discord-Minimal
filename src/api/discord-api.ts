/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { RequestInit, Response } from 'node-fetch';
import { Snowflake } from '../custom-types/snowflake';
import DiscordInteractionResponse from '../data-objects/discord-interaction-response';
import DiscordMessageCreate from '../data-objects/discord-message-create';
import DiscordMessageEdit from '../data-objects/discord-message-edit';
import DiscordMessage from '../data-objects/discord-message';
import { DiscordAPIError, DiscordMinimal } from '..';
import DiscordGatewayBotInfo from '../data-objects/discord-gateway-bot-info';
import RateLimitBucket from './rate-limit-bucket';

const URL_BASE = 'https://discord.com/api/v8';

let requestQueue = Promise.resolve();
let requestQueueLen = 0;

const bucketMap: { [key: string]: RateLimitBucket } = {};

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendFetch(url: string, urlGroup: string, init?: RequestInit | undefined): Promise<Response> {
    return new Promise<Response>((resolve, reject) => queueReq(url, urlGroup, resolve, reject, init));
}

function queueReq(url: string, urlGroup: string, resolve: (value: Response | PromiseLike<Response>) => void, reject: (reason?: any) => void, init?: RequestInit | undefined) {
    requestQueueLen++;
    requestQueue = requestQueue.then(async () => await processQueue(url, urlGroup, resolve, reject, init)).finally(() => requestQueueLen--);
}

async function processQueue(url: string, urlGroup: string, resolve: (value: Response | PromiseLike<Response>) => void, reject: (reason?: any) => void, init?: RequestInit | undefined) {
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

export function getGatewayBot(): Promise<DiscordGatewayBotInfo> {
    const url = '/gateway/bot';
    return sendFetch(url, url, {
        method: 'GET',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordGatewayBotInfo(json));
        return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function interactionCallback(interactionId: number, interactionToken: string, data: DiscordInteractionResponse): void {
    const url = `${URL_BASE}/interactions/${interactionId}/${interactionToken}/callback`;
    fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function createMessage(channelId: Snowflake, message: DiscordMessageCreate): Promise<DiscordMessage> {
    const url = `/channels/${channelId}/messages`;
    return sendFetch(url, `/channels/${channelId}/messages/create`, {
        method: 'POST',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordMessage(json));
        return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function editMessage(channelId: Snowflake, messagelId: Snowflake, message: DiscordMessageEdit): Promise<DiscordMessage> {
    const url = `/channels/${channelId}/messages/${messagelId}`;
    return sendFetch(url, `/channels/${channelId}/messages/edit`, {
        method: 'PATCH',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordMessage(json));
        return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function addReaction(channelId: Snowflake, messagelId: Snowflake, emoji: string): Promise<void> {
    const url = `/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/@me`;
    return sendFetch(url, `/channels/${channelId}/messages/reactions`, {
        method: 'PUT',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function deleteUserReaction(channelId: Snowflake, messagelId: Snowflake, emoji: string, userId: Snowflake): Promise<void> {
    const url = `/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/${userId}`;
    return sendFetch(url, `/channels/${channelId}/messages/reactions`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}

export function deleteAllReactions(channelId: Snowflake, messagelId: Snowflake): Promise<void> {
    const url = `/channels/${channelId}/messages/${messagelId}/reactions`;
    return sendFetch(url, `/channels/${channelId}/messages/reactions`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message, url); });
    });
}