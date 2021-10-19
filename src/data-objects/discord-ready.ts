import DiscordUser from './discord-user';

export default class DiscordReady {
    public v!: number;                  // Gateway version
    public user!: DiscordUser;          // Information about the user including email
    //public guilds	array of Unavailable Guild objects	the guilds the user is in
    public session_id!: string;         // Used for resuming connections
    public shard?: number[];            // Array of two integers(shard_id, num_shards) the shard information associated with this session, if sent when identifying
    //public application	partial application object	contains id and flags
}