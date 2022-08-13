/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordGatewayBotInfo {

    /**
     * The WSS URL that can be used for connecting to the gateway
     */
    public url: string;

    /**
     * The recommended number of shards to use when connecting
     */
    public shards: number;

    /**
     * Information on the current session start limit
     */
    public session_start_limit: DiscordGatewaySessionStartLimit;

    constructor(json: any) {
        this.url = json.url;
        this.shards = json.shards;
        this.session_start_limit = new DiscordGatewaySessionStartLimit(json.session_start_limit ?? {});
    }
}

export class DiscordGatewaySessionStartLimit {

    /**
     * The total number of session starts the current user is allowed
     */
    public total: number;

    /**
     * The remaining number of session starts the current user is allowed
     */
    public remaining: number;

    /**
     * The number of milliseconds after which the limit resets
     */
    public reset_after: number;

    /**
     * The number of identify requests allowed per 5 seconds
     */
    public max_concurrency: number;

    constructor(json: any) {
        this.total = json.total;
        this.remaining = json.remaining;
        this.reset_after = json.reset_after;
        this.max_concurrency = json.max_concurrency;
    }
}