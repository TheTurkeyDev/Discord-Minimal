export default class DiscordEmbedImage {
    public url: string;	                // Source url of image (only supports http(s) and attachments)
    public proxy_url?: string;	        // A proxied url of the image
    public height?: number;	            // Height of image
    public width?: number;              // Width of image

    public constructor(url: string, proxyUrl?: string, height?: number, width?: number) {
        this.url = url;
        this.proxy_url = proxyUrl;
        this.height = height;
        this.width = width;
    }
}