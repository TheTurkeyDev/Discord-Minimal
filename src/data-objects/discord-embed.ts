import { DiscordEmbedAuthor } from './discord-embed-author';
import { DiscordEmbedField } from './discord-embed-field';
import { DiscordEmbedFooter } from './discord-embed-footer';
import { DiscordEmbedImage } from './discord-embed-image';

export class DiscordEmbed {

    /**
     * Title of embed
     */
    public title?: string;

    /**
     * Type of embed (always "rich" for webhook embeds)
     */
    public type?: string;

    /**
     * Description of embed
     */
    public description?: string;

    /**
     * Url of embed
     */
    public url?: string;

    /**
     * timestamp of embed content (ISO8601 timestamp)
     */
    public timestamp?: string;

    /**
     * Color code of the embed
     */
    public color?: number;

    /**
     * Footer information
     */
    public footer?: DiscordEmbedFooter;

    /**
     * Image information
     */
    public image?: DiscordEmbedImage;

    // public thumbnail?	embed thumbnail object	thumbnail information
    // public video?	embed video object	video information
    // public provider?	embed provider object	provider information

    /**
     *  Embed author object	author information
     */
    public author?: DiscordEmbedAuthor;

    /**
     * Array of embed field objects fields information
     */
    public fields: DiscordEmbedField[] = [];


    public setColor(color: number | string): DiscordEmbed {
        this.color = typeof color === 'string' ? Number(color) : color;
        return this;
    }

    public setDescription(description: string): DiscordEmbed {
        this.description = description;
        return this;
    }

    public setTitle(title: string): DiscordEmbed {
        this.title = title;
        return this;
    }

    public setAuthor(name: string, iconUrl?: string, url?: string, proxyIconUrl?: string): DiscordEmbed {
        this.author = new DiscordEmbedAuthor(name);
        this.author.url = url;
        this.author.icon_url = iconUrl;
        this.author.proxy_icon_url = proxyIconUrl;
        return this;
    }

    public setImage(url: string, proxy_url?: string, height?: number, width?: number): DiscordEmbed {
        this.image = new DiscordEmbedImage(url);
        this.image.proxy_url = proxy_url;
        this.image.height = height;
        this.image.width = width;
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): DiscordEmbed {
        const field = new DiscordEmbedField(name, value);
        field.inline = inline;
        this.fields?.push(field);

        return this;
    }

    public setFooter(text: string, icon_url?: string, proxy_icon_url?: string): DiscordEmbed {
        this.footer = new DiscordEmbedFooter(text);
        this.footer.icon_url = icon_url;
        this.footer.proxy_icon_url = proxy_icon_url;
        return this;
    }

    public setTimestamp(): DiscordEmbed {
        this.timestamp = new Date().toISOString();
        return this;
    }

    static fromJson(json: any) {
        const embed = new DiscordEmbed();
        embed.title = json.title;
        embed.type = json.type;
        embed.description = json.description;
        embed.url = json.url;
        embed.timestamp = json.timestamp;
        embed.color = json.color;
        embed.footer = json.footer && DiscordEmbedFooter.fromJson(json.footer);
        embed.image = json.image && DiscordEmbedImage.fromJson(json.image);
        embed.author = json.author && DiscordEmbedAuthor.fromJson(json.author);
        embed.fields = json.fields?.map(DiscordEmbedField.fromJson) ?? [];

        return embed;
    }
}