import DiscordEmbedAuthor from './discord-embed-author';
import DiscordEmbedField from './discord-embed-field';
import DiscordEmbedFooter from './discord-embed-footer';
import DiscordEmbedImage from './discord-embed-image';

export class DiscordEmbed {

    /**
     * Title of embed
     */
    public title?: string;

    /**
     * Type of embed (always "rich" for webhook embeds)
     */
    public type?:string;

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
    public fields?: DiscordEmbedField[] = [];


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
        this.author = new DiscordEmbedAuthor(name, url, iconUrl, proxyIconUrl);
        return this;
    }

    public setImage(url: string, proxyUrl?: string, height?: number, width?: number): DiscordEmbed {
        this.image = new DiscordEmbedImage(url, proxyUrl, height, width);
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): DiscordEmbed {
        this.fields?.push(new DiscordEmbedField(name, value, inline));
        return this;
    }

    public setFooter(text: string, iconUrl?: string, proxyIconUrl?: string): DiscordEmbed {
        this.footer = new DiscordEmbedFooter(text, iconUrl, proxyIconUrl);
        return this;
    }

    public setTimestamp(): DiscordEmbed {
        this.timestamp = new Date().toISOString();
        return this;
    }
}