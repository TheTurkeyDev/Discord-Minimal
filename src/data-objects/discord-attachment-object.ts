import { Snowflake } from '../custom-types';

export class DiscordAttachmentObject {
    /**
     * Attachment id
     */
    public id: Snowflake;
    /**
     * Name of file attached
     */
    public filename?: string;
    /**
     * Description for the file (max 1024 characters)
     */
    public description?: String;
    /**
     * the attachment's media type
     */
    public content_type?: String;
    /**
     * size of file in bytes
     */
    public size?: number;
    /**
     * Source url of file
     */
    public url?: string;
    /**
     * A proxied url of file
     */
    public proxy_url?: string;
    /**
     * Height of file(if image)
     */
    public height?: number;
    /**
     * Width of file(if image)
     */
    public width?: number;
    /**
     * Whether this attachment is ephemeral
     */
    public ephemeral?: boolean;

    constructor(id: Snowflake) {
        this.id = id;
    }

    static fromJson(json: any): DiscordAttachmentObject {
        const newInst = new DiscordAttachmentObject(json.id);
        newInst.filename = json.filename;
        newInst.description = json.description;
        newInst.content_type = json.content_type;
        newInst.size = json.size;
        newInst.url = json.url;
        newInst.proxy_url = json.proxy_url;
        newInst.height = json.height;
        newInst.width = json.width;
        newInst.ephemeral = json.ephemeral;
        return newInst;
    }
}