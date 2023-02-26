import { Snowflake } from '../custom-types';
import { DiscordComponent } from './discord-component';
import { DiscordEmbed } from './discord-embed';
import { DiscordMessageReference } from './discord-message-reference';

export class DiscordMessageCreate {

    /**
     * The message contents(up to 2000 characters)
     */
    public content?: string;

    /**
     * True if this is a TTS message
     */
    public tts?: boolean;
    //public file: file contents	the contents of the file being sent

    /**
     * Embedded rich content(up to 6000 characters)
     */
    public embeds?: DiscordEmbed[];

    /**
     * JSON encoded body of non - file params
     */
    public payload_json?: string;
    //public allowed_mentions	allowed mention object	allowed mentions for the message

    /**
     * Include to make your message a reply
     */
    public message_reference?: DiscordMessageReference;

    /**
     * The components to include with the message
     */
    public components?: DiscordComponent[];

    /**
     * IDs of up to 3 stickers in the server to send in the message
     */
    public sticker_ids?: Snowflake[];
}