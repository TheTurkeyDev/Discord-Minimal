import fetch from 'node-fetch';
import { DiscordMessage, Snowflake } from '.';
import DiscordInteractionResponse from './data-objects/discord-interaction-response';
import DiscordMessageCreate from './data-objects/discord-message-create';
import DiscordMessageEdit from './data-objects/discord-message-edit';

const URL_BASE = 'https://discord.com/api/v8';

export function interactionCallback(interactionId: number, interactionToken: string, data: DiscordInteractionResponse): void {
    fetch(`${URL_BASE}/interactions/${interactionId}/${interactionToken}/callback`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(resp => resp.json()).then(json => console.log(json));
}

export function createMessage(channelId: Snowflake, message: DiscordMessageCreate): Promise<DiscordMessage> {
    return fetch(`${URL_BASE}/channels/${channelId}/messages`, {
        method: 'POST',
        body: JSON.stringify(message),
    }).then(resp => resp.json()).then(json => json as DiscordMessage);
}

export function editMessage(channelId: Snowflake, messagelId: Snowflake, message: DiscordMessageEdit): Promise<DiscordMessage> {
    return fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}`, {
        method: 'PATCH',
        body: JSON.stringify(message),
    }).then(resp => resp.json()).then(json => json as DiscordMessage);
}

export function addReaction(channelId: Snowflake, messagelId: Snowflake, emoji: string): void {
    fetch(`${URL_BASE}/channels/${channelId}/messages/${messagelId}/reactions/${encodeURIComponent(emoji)}/@me`, {
        method: 'PUT'
    }).then(resp => { });
}