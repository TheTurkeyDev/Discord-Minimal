/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DiscordUser from './discord-user';

export default class DiscordReady {
    public v!: number;                  // Gateway version
    public user!: DiscordUser;          // Information about the user including email
    //public guilds	array of Unavailable Guild objects	the guilds the user is in
    public session_id!: string;         // Used for resuming connections
    public shard?: number[];            // Array of two integers(shard_id, num_shards) the shard information associated with this session, if sent when identifying
    //public application	partial application object	contains id and flags

    constructor(json: any) {
        this.v = json.v;
        this.session_id = json.session_id;
        this.shard = json.shard;
        this.user = new DiscordUser(json.user);
    }
}