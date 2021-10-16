export default class DiscordEmbedFooter {
    public text: string;	        // Footer text
    public icon_url?: string;	    // 	url of footer icon (only supports http(s) and attachments)
    public proxy_icon_url?: string; // A proxied url of footer icon

    public constructor(text: string, iconUrl?: string, proxyIconUrl?: string) {
        this.text = text;
        this.icon_url = iconUrl;
        this.proxy_icon_url = proxyIconUrl;
    }
}