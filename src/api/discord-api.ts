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
    DiscordInteractionResponseMessageData,
    DiscordRole
} from '../data-objects';
import { RateLimitBucket } from './rate-limit-bucket';
import DiscordMinimal from '../discord-minimal';
import { MultiPartForm } from './multi-part-form';
import { DiscordWebhookEditMessage } from '../data-objects/discord-webhook-edit-message';
import { DiscordEntitlement } from '../data-objects/discord-entitlement';

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
            await r.json().then(json => globalWait = json.retry_after * 1000);
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

    const ct = resp.headers.get('Content-Type');

    if (ct === 'application/json') {
        const json = await resp.json();

        if (resp.ok)
            return construct(json);
        throw new DiscordAPIError(json.code, json.message, json.errors, method, `${topLvlUrl}${urlExtra}`);
    }
    else {
        // Should this be different?
        return construct(undefined);
    }
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
        data.addPart(`files[${i}]`, 'plain/txt', respData.files[i].toString(), respData.attachments[i].filename);
    }
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

export async function deleteOriginalInteraction(
    applicationId: Snowflake,
    interactionToken: string,
): Promise<void> {
    const url = `${URL_BASE}/webhooks/${applicationId}/${interactionToken}/messages/@original`;
    const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
        },
    });

    if (!resp.ok) {
        const json = await resp.json();
        throw new DiscordAPIError(json.code, json.message, json.errors, 'DELETE', url);
    }
}

export async function editOriginalInteraction(
    applicationId: Snowflake,
    interactionToken: string,
    data: DiscordWebhookEditMessage
): Promise<void> {
    const url = `${URL_BASE}/webhooks/${applicationId}/${interactionToken}/messages/@original`;
    const resp = await fetch(url, {
        method: 'PATCH',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        const json = await resp.json();
        throw new DiscordAPIError(json.code, json.message, json.errors, 'PATCH', url);
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

/**
 * 
 * @param channelId 
 * @param messageId 
 * @param name 1-100 character channel name
 * @param autoArchiveDuration The thread will stop showing in the channel list after auto_archive_duration minutes of inactivity, can be set to: 60, 1440, 4320, 10080
 * @param rateLimitPerUser Amount of seconds a user has to wait before sending another message (0-21600)
 * @returns 
 */
export async function startThreadFromMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    name: string,
    autoArchiveDuration?: number,
    rateLimitPerUser?: number
): Promise<DiscordChannel> {
    const url = `/channels/${channelId}/messages`;
    return makeFetch(url, `/${messageId}/threads`, 'POST', DiscordChannel.fromJson, JSON.stringify({
        name,
        auto_archive_duration: autoArchiveDuration,
        rate_limit_per_user: rateLimitPerUser
    }));
}

/**
 * @see {@link https://discord.com/developers/docs/monetization/entitlements#list-entitlements}
 * @param applicationId 
 * @param userId User ID to look up entitlements for
 * @param skuIds Optional list of SKU IDs to check entitlements for
 * @param before Retrieve entitlements before this time
 * @param after Retrieve entitlements after this time
 * @param limit Number of entitlements to return, 1-100, default 100
 * @param guildId Guild ID to look up entitlements for
 * @param excludeEnded Whether entitlements should be omitted
 * @returns list of entitlements
 */
export async function getEntitlements(
    applicationId: Snowflake,
    userId?: Snowflake,
    skuIds?: Snowflake[],
    before?: Snowflake,
    after?: Snowflake,
    limit?: number,
    guildId?: Snowflake,
    excludeEnded?: boolean,
): Promise<DiscordEntitlement[]> {
    const url = `/applications/${applicationId}/entitlements`;
    const params = `?${userId ? `user_id=${userId}&` : ''}\
    ${skuIds ? `sku_ids=${skuIds.join(',')}&` : ''}\
    ${before ? `before=${before}&` : ''}\
    ${after ? `after=${after}&` : ''}\
    ${limit ? `limit=${limit}&` : ''}\
    ${guildId ? `guild_id=${guildId}&` : ''}\
    ${excludeEnded ? `exclude_ended=${excludeEnded}&` : ''}`;

    return makeFetch(url, params, 'GET', (json) => json.map(DiscordEntitlement.fromJson));
}

/**
 * @see {@link https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement}
 * @param applicationId 
 * @param skuId ID of the SKU to grant the entitlement to
 * @param ownerId ID of the guild or user to grant the entitlement to
 * @param ownerType 1 for a guild subscription, 2 for a user subscription
 * @returns 
 */
export async function createTestEntitlement(
    applicationId: Snowflake,
    skuId: Snowflake,
    ownerId: Snowflake,
    ownerType: number,
): Promise<void> {
    const url = `/applications/${applicationId}/entitlements`;
    return makeFetch(url, '', 'POST', () => { }, JSON.stringify({
        sku_id: skuId,
        owner_id: ownerId,
        owner_type: ownerType
    }));
}

/**
 * @see {@link https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement}
 * @param applicationId 
 * @param entitlementId ID of the entitlement to delete
 * @returns 
 */
export async function deleteTestEntitlement(applicationId: Snowflake, entitlementId: Snowflake): Promise<void> {
    const url = `/applications/${applicationId}/entitlements/${entitlementId}`;
    return makeFetch(url, '', 'DELETE', () => { });
}


/**
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
 * @param guildId ID of the guild to get the roles of
 * @returns list of roles
 */
export async function getGuildRoles(guildId: Snowflake): Promise<DiscordRole[]> {
    const url = `/guilds/${guildId}/roles`;
    return makeFetch(url, '', 'GET', (json) => json.map(DiscordRole.fromJson));
}

/**
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-role}
 * @param guildId ID of the guild to create the role in
 * @param role data of the role to create
 * @returns list of roles
 */
export async function createGuildRole(guildId: Snowflake, role: DiscordRole): Promise<DiscordRole> {
    const url = `/guilds/${guildId}/roles`;
    return makeFetch(url, '', 'POST', DiscordRole.fromJson, JSON.stringify(role));
}

/**
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role}
 * @param guildId ID of the guild to modify the role in
 * @param role data to update the role with
 * @param roleId ID of the role to modify. If not specified, will use the id of the passed role parameter
 * @returns list of roles
 */
export async function modifyGuildRole(guildId: Snowflake, role: DiscordRole, roleId?: Snowflake): Promise<DiscordRole> {
    const url = `/guilds/${guildId}/roles`;
    return makeFetch(url, `/${roleId ?? role.id}`, 'PATCH', DiscordRole.fromJson, JSON.stringify(role));
}


/**
 * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-role}
 * @param guildId ID of the guild to modify the role in
 * @param roleId ID of the role to delete
 * @returns list of roles
 */
export async function deleteGuildRole(guildId: Snowflake, roleId: Snowflake): Promise<void> {
    const url = `/guilds/${guildId}/roles`;
    return makeFetch(url, `/${roleId}`, 'DELETE', () => {});
}