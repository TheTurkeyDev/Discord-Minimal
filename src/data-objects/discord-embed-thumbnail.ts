export class DiscordEmbedThumbnail {

    /**
     * Source url of image (only supports http(s) and attachments)
     */
    public url: string;

    /**
     * A proxied url of the image
     */
    public proxy_url?: string;

    /**
     * Height of image
     */
    public height?: number;

    /**
     * Width of image
     */
    public width?: number;

    public constructor(url: string) {
        this.url = url;
    }

    static fromJson(json: any) {
        const embedImage = new DiscordEmbedThumbnail(json.url);
        embedImage.proxy_url = json.proxy_url;
        embedImage.height = json.height;
        embedImage.width = json.width;
        return embedImage;
    }
}