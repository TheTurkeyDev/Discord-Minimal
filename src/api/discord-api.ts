import fetch from 'node-fetch';
import { Snowflake } from '../custom-types/snowflake';
import DiscordInteractionResponse from '../data-objects/discord-interaction-response';
import DiscordMessageCreate from '../data-objects/discord-message-create';
import DiscordMessageEdit from '../data-objects/discord-message-edit';
import DiscordMessage from '../data-objects/discord-message';
import { DiscordAPIError, DiscordMinimal } from '..';

const URL_BASE = 'https://discord.com/api/v8';

export function interactionCallback(interactionId: number, interactionToken: string, data: DiscordInteractionResponse): void {
    fetch(`${URL_BASE}/interactions/${interactionId}/${interactionToken}/callback`, {
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
    return fetch(`${URL_BASE}/channels/${channelId}/messages`, {
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
    return fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}`, {
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
    fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/@me`, {
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
    fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/${userId}`, {
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
    fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}/reactions`, {
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