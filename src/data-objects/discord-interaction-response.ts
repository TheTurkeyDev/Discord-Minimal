import { DiscordInteractionCallbackType } from '../custom-types/discord-interaction-callback-type';
import DiscordInteractionResponseData from './discord-interaction-response-data';

export default class DiscordInteractionResponse {
    public type!: DiscordInteractionCallbackType;        // The type of response
    public data?: DiscordInteractionResponseData;	    // An optional response message
}