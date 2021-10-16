/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import DiscordInteraction from './data-objects/discord-interaction';
import DiscordMessage from './data-objects/discord-message';
import DiscordMessageReactionAdd from './data-objects/discord-message-reaction-add';

export interface DiscordEventMap {
    messageCreate: DiscordMessage;
    interactionCreate: DiscordInteraction;
    messageReactionAdd: DiscordMessageReactionAdd;
}

export interface DiscordEventListenerMap {
    messageCreate: (event: DiscordMessage) => void | { handleEvent: (event: DiscordMessage) => void };
    interactionCreate: (event: DiscordInteraction) => void | { handleEvent: (event: DiscordInteraction) => void };
    messageReactionAdd: (event: DiscordMessageReactionAdd) => void | { handleEvent: (event: DiscordMessageReactionAdd) => void };
}