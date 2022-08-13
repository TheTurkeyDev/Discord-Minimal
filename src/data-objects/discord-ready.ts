/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DiscordApplication from './discord-application';
import { DiscordGuild } from './discord-guild';
import { DiscordUser } from './discord-user';

export class DiscordReady {

    /**
     * Gateway version
     */
    public v: number;

    /**
     * Information about the user including email
     */
    public user: DiscordUser;

    /**
     * The guilds the user is in
     */
    public guilds: DiscordGuild[];

    /**
     * Used for resuming connections
     */
    public session_id: string;

    /**
     * Array of two integers(shard_id, num_shards) the shard information associated with this session, if sent when identifying
     */
    public shard?: number[];

    /**
     * Partial application object, contains id and flags
     */
    public application: DiscordApplication;

    constructor(json: any) {
        this.v = json.v;
        this.user = DiscordUser.fromJson(json.user);
        this.guilds = json.guilds.map(DiscordGuild.fromJson);
        this.session_id = json.session_id;
        this.shard = json.shard;
        this.application = DiscordApplication.fromJson(json.application);
    }
}