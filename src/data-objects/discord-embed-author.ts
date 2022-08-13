export default class DiscordEmbedAuthor {

    /**
     * Name of author
     */
    public name: string;

    /**
     * URL of author
     */
    public url?: string;

    /**
     * URL of author icon(only supports http(s) and attachments)
     */
    public icon_url?: string;

    /**
     * A proxied url of author icon
     */
    public proxy_icon_url?: string;

    public constructor(name: string, url?: string, iconUrl?: string, proxyIconUrl?: string) {
        this.name = name;
        this.url = url;
        this.icon_url = iconUrl;
        this.proxy_icon_url = proxyIconUrl;
    }
}