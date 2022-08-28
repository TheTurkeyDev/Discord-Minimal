import { DiscordInteractionCallbackType } from '../custom-types/discord-interaction-callback-type';
import DiscordInteractionResponseMessageData from './discord-interaction-response-message-data';
import DiscordInteractionResponseModalData from './discord-interaction-response-modal-data';

export default class DiscordInteractionResponse {
    
    /**
     * The type of response
     */
    public type!: DiscordInteractionCallbackType;

    /**
     * An optional response message
     */
    public data?: DiscordInteractionResponseMessageData | DiscordInteractionResponseModalData;
}