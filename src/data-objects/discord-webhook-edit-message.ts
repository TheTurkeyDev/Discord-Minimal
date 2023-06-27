import { DiscordComponent, DiscordEmbed } from '..';

export class DiscordWebhookEditMessage {
    /**
     * The message contents (up to 2000 characters)
     */
    public content?: string;

    /**
     * Array of up to 10 embed objects. Embedded rich content
     */
    public embeds: DiscordEmbed[] = [];

    //allowed_mentions	allowed mention object	allowed mentions for the message

    /**
     * The components to include with the message
     * Requires an application-owned webhook.
     */
    public components: DiscordComponent[] = [];

    // files[n] **	file contents	the contents of the file being sent/edited
    // payload_json **	string	JSON encoded body of non-file params (multipart/form-data only)
    // attachments **	array of partial attachment objects	attached files to keep and possible descriptions for new files

    static fromJson(json: any): DiscordWebhookEditMessage {
        const edit = new DiscordWebhookEditMessage();
        edit.content = json.content;
        edit.embeds = json.embeds?.map(DiscordEmbed.fromJson) ?? [];
        edit.components = json.components?.map(DiscordComponent.fromJson) ?? [];

        return edit;
    }
}