import fetch, { RequestInit, Response } from 'node-fetch';
import { Snowflake } from '../custom-types/snowflake';
import DiscordInteractionResponse from '../data-objects/discord-interaction-response';
import DiscordMessageCreate from '../data-objects/discord-message-create';
import DiscordMessageEdit from '../data-objects/discord-message-edit';
import DiscordMessage from '../data-objects/discord-message';
import { DiscordAPIError, DiscordMinimal } from '..';
import DiscordGatewayBotInfo from '../data-objects/discord-gateway-bot-info';

const URL_BASE = 'https://discord.com/api/v8';

const requestLog: { [key: string]: number[] } = {};

function sendFetch(url: string, init?: RequestInit | undefined): Promise<Response> {
    const now = Date.now();
    if (requestLog[url]) {
        const last5Sec = requestLog[url].filter(ts => ts > now - 5000);
        if (last5Sec.length >= 5) {
            const fifth = last5Sec[last5Sec.length - 5];
            const sendTime = fifth + 5200;
            requestLog[url].push(sendTime);
            return new Promise<Response>((resolve, reject) => {
                setTimeout(async () => {
                    resolve(await fetch(`${URL_BASE}${url}`, init));
                }, sendTime - now);
            });
        }
        else {
            requestLog[url].push(now);
            return fetch(`${URL_BASE}${url}`, init);
        }
    }
    else {
        requestLog[url] = [now];
        return fetch(`${URL_BASE}${url}`, init);
    }
}

export function cleanReqLog(): void {
    const now = Date.now();
    Object.keys(requestLog).forEach(url => {
        requestLog[url] = requestLog[url].filter(ts => ts > now - 5000);
        if (requestLog[url].length === 0)
            delete requestLog[url];
    });
}

export function getGatewayBot(): Promise<DiscordGatewayBotInfo> {
    return sendFetch('/gateway/bot', {
        method: 'GET',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordGatewayBotInfo(json));
        else
            return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function interactionCallback(interactionId: number, interactionToken: string, data: DiscordInteractionResponse): void {
    sendFetch(`/interactions/${interactionId}/${interactionToken}/callback`, {
        method: 'POST',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function createMessage(channelId: Snowflake, message: DiscordMessageCreate): Promise<DiscordMessage> {
    return sendFetch(`/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordMessage(json));
        else
            return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function editMessage(channelId: Snowflake, messagelId: Snowflake, message: DiscordMessageEdit): Promise<DiscordMessage> {
    return sendFetch(`/channels/${channelId}/messages/${messagelId}`, {
        method: 'PATCH',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then(resp => {
        if (resp.ok)
            return resp.json().then(json => new DiscordMessage(json));
        else
            return resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function addReaction(channelId: Snowflake, messagelId: Snowflake, emoji: string): void {
    sendFetch(`/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/@me`, {
        method: 'PUT',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function deleteuserReaction(channelId: Snowflake, messagelId: Snowflake, emoji: string, userId: Snowflake): void {
    sendFetch(`/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/${userId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}

export function deleteAllReactions(channelId: Snowflake, messagelId: Snowflake): void {
    sendFetch(`/channels/${channelId}/messages/${messagelId}/reactions`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bot ${DiscordMinimal.token}`,
            'Content-Type': 'application/json',
        }
    }).then(resp => {
        if (!resp.ok)
            resp.json().then(json => { throw new DiscordAPIError(json.code, json.message); });
    });
}