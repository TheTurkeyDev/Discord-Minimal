/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordGuild, DiscordUser } from '..';
import DiscordApplication from './discord-application';

export class DiscordReady
{
    public v!: number;                          // Gateway version
    public user!: DiscordUser;                  // Information about the user including email
    public guilds!: DiscordGuild[];             // The guilds the user is in
    public session_id!: string;                 // Used for resuming connections
    public shard?: number[];                    // Array of two integers(shard_id, num_shards) the shard information associated with this session, if sent when identifying
    public application!: DiscordApplication;     // Partial application object, contains id and flags

    constructor(json: any)
    {
        this.v = json.v;
        this.user = DiscordUser.fromJson(json.user);
        this.guilds = json.guilds.map(DiscordGuild.fromJson);
        this.session_id = json.session_id;
        this.shard = json.shard;
        this.application = DiscordApplication.fromJson(json.application);
    }
}