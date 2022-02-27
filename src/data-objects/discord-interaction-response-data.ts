import DiscordComponent from './discord-component';
import { DiscordEmbed } from './discord-embed';


export default class DiscordInteractionResponseData {
    public tts?: boolean;                           // Is the response TTS
    public content?: string;	                    // Message content
    public embeds?: DiscordEmbed[];                 // Supports up to 10 embeds
    //public allowed_mentions? allowed mentions	allowed mentions object
    public flags?: number;	                        // Interaction callback data flags
    public components?: DiscordComponent[];         // Message components
}