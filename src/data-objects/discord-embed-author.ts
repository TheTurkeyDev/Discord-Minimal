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

    public constructor(name: string) {
        this.name = name;

    }

    static fromJson(json: any) {
        const embedAuthor = new DiscordEmbedAuthor(json.name);
        embedAuthor.url = json.url;
        embedAuthor.icon_url = json.iconUrl;
        embedAuthor.proxy_icon_url = json.proxyIconUrl;
        return embedAuthor;
    }
}