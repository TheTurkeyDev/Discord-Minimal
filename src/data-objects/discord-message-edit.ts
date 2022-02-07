import { DiscordEmbed } from '..';
import DiscordComponent from './discord-component';


export default class DiscordMessageEdit {
    public content?: string;                    // The message contents(up to 2000 characters)
    public embeds?: DiscordEmbed[];             // Embedded rich content(up to 6000 characters)
    public flags?: number;                      //	Edit the flags of a message (only SUPPRESS_EMBEDS can currently be set/unset)
    ///public file	file contents	the contents of the file being sent / edited
    public payload_json?: string;	            // JSON encoded body of non - file params
    //public allowed_mentions	allowed mention object	allowed mentions for the message
    //public attachments	array of attachment objects	attached files to keep
    public components?: DiscordComponent[];      // The components to include with the messag
}