import DiscordComponent from './discord-component';
import { DiscordEmbed } from './discord-embed';


export default class DiscordMessageEdit {

    /**
     * The message contents(up to 2000 characters)
     */
    public content?: string;

    /**
     * Embedded rich content(up to 6000 characters)
     */
    public embeds?: DiscordEmbed[];

    /**
     * Edit the flags of a message (only SUPPRESS_EMBEDS can currently be set/unset)
     */
    public flags?: number;

    ///public file	file contents	the contents of the file being sent / edited

    /**
     * JSON encoded body of non - file params
     */
    public payload_json?: string;
    //public allowed_mentions	allowed mention object	allowed mentions for the message
    //public attachments	array of attachment objects	attached files to keep

    /**
     * The components to include with the message
     */
    public components?: DiscordComponent[];
}