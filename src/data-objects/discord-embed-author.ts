export default class DiscordEmbedAuthor {
    public name: string;                // Name of author
    public url?: string;	            // URL of author
    public icon_url?: string;	        // URL of author icon(only supports http(s) and attachments)
    public proxy_icon_url?: string;     // A proxied url of author icon

    public constructor(name: string, url?: string, iconUrl?: string, proxyIconUrl?: string) {
        this.name = name;
        this.url = url;
        this.icon_url = iconUrl;
        this.proxy_icon_url = proxyIconUrl;
    }
}