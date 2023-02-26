export class DiscordEmbedImage {

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
        const embedImage = new DiscordEmbedImage(json.url);
        embedImage.proxy_url = json.proxyUrl;
        embedImage.height = json.height;
        embedImage.width = json.width;
        return embedImage;
    }
}