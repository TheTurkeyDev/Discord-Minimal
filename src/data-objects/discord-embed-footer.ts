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

    public constructor(text: string) {
        this.text = text;
    }

    static fromJson(json: any) {
        const embedFooter = new DiscordEmbedFooter(json.text);
        embedFooter.icon_url = json.iconUrl;
        embedFooter.proxy_icon_url = json.proxyIconUrl;
        return embedFooter;
    }
}