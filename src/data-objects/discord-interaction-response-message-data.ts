import { DiscordAttachmentObject } from './discord-attachment-object';
import { DiscordComponent } from './discord-component';
import { DiscordEmbed } from './discord-embed';


export class DiscordInteractionResponseMessageData {

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

    /**
     * Attachment objects with filename and description
     */
    public attachments: DiscordAttachmentObject[] = [];

    /**
     * Files to be uploaded
     */
    public files: Buffer[] = [];

    public addAttachment(filename: string, description: string, fileContents: Buffer) {
        this.attachments.push({
            id: this.files.length.toString(),
            filename,
            description
        });

        this.files.push(fileContents);
    }
}