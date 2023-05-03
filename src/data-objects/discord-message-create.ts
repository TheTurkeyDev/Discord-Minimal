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
     * Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event.
     */
    public nonce?: number | string;

    /**
     * True if this is a TTS message
     */
    public tts?: boolean;

    /**
     * Embedded rich content(up to 6000 characters)
     */
    public embeds?: DiscordEmbed[];

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

    //public file: file contents	the contents of the file being sent

    /**
     * JSON encoded body of non - file params
     */
    public payload_json?: string;

    // attachments?	array of partial attachment objects	Attachment objects with filename and description. See Uploading Files

    /**
     * Message flags combined as a bitfield (only SUPPRESS_EMBEDS and SUPPRESS_NOTIFICATIONS can be set)
     */
    public flags?: number;
}