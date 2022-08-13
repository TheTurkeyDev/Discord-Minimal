export default class DiscordEmbedImage {

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

    public constructor(url: string, proxyUrl?: string, height?: number, width?: number) {
        this.url = url;
        this.proxy_url = proxyUrl;
        this.height = height;
        this.width = width;
    }
}