/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class DiscordGatewayBotInfo {
    public url: string;	                                            // The WSS URL that can be used for connecting to the gateway
    public shards: number;                                          // The recommended number of shards to use when connecting
    public session_start_limit: DiscordGatewaySessionStartLimit;    // Information on the current session start limit

    constructor(json: any) {
        this.url = json.url;
        this.shards = json.shards;
        this.url = json.url;
        this.session_start_limit = new DiscordGatewaySessionStartLimit(json.session_start_limit ?? {});
    }
}

export class DiscordGatewaySessionStartLimit {
    public total: number;               // The total number of session starts the current user is allowed
    public remaining: number;           // The remaining number of session starts the current user is allowed
    public reset_after: number;         // The number of milliseconds after which the limit resets
    public max_concurrency: number;     // The number of identify requests allowed per 5 seconds

    constructor(json: any) {
        this.total = json.total;
        this.remaining = json.remaining;
        this.reset_after = json.reset_after;
        this.max_concurrency = json.max_concurrency;
    }
}