import { Snowflake } from '../custom-types/snowflake';
import DiscordComponent from './discord-component';
import DiscordEmbed from './discord-embed';
import DiscordMessageRefrence from './discord-message-refrence';

export default class DiscordMessageCreate {
    public content?: string;                                // The message contents(up to 2000 characters)
    public tts?: boolean;                                   // true if this is a TTS message
    //public file: file contents	the contents of the file being sent
    public embeds?: DiscordEmbed[];                         // Embedded rich content(up to 6000 characters)
    public payload_json?: string;	                        // JSON encoded body of non - file params
    //public allowed_mentions	allowed mention object	allowed mentions for the message
    public message_reference?: DiscordMessageRefrence;      // Include to make your message a reply
    public components?: DiscordComponent[];                 // The components to include with the messag
    public sticker_ids?: Snowflake[];                       // IDs of up to 3 stickers in the server to send in the message
}