import { DiscordMessageFlags } from '../custom-types';
import DiscordComponent from './discord-component';
import { DiscordEmbed } from './discord-embed';


export default class DiscordInteractionResponseMessageData {

    /**
     * Is the response TTS
     */
    public tts?: boolean;

    /**
     * Message content
     */
    public content?: string;

    /**
     * Supports up to 10 embeds
     */
    public embeds?: DiscordEmbed[];
    //public allowed_mentions? allowed mentions	allowed mentions object

    /**
     * Interaction callback data flags
     */
    public flags?: number;

    /**
     * Message components
     */
    public components?: DiscordComponent[];
}