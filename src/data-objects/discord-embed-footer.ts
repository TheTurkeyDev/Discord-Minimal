export default class DiscordEmbedFooter {

    /**
     * Footer text
     */
    public text: string;

    /**
     * Url of footer icon (only supports http(s) and attachments)
     */
    public icon_url?: string;

    /**
     * A proxied url of footer icon
     */
    public proxy_icon_url?: string;

    public constructor(text: string, iconUrl?: string, proxyIconUrl?: string) {
        this.text = text;
        this.icon_url = iconUrl;
        this.proxy_icon_url = proxyIconUrl;
    }
}