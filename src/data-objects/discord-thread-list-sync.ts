import { Snowflake } from '../custom-types';
import { DiscordChannel } from './discord-channel';
import { DiscordThreadMember } from './discord-thread-member';

export class DiscordThreadListSync {

    /**
     * The id of the guild
     */
    public guild_id: Snowflake;

    /**
     * The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channel_ids that have no active threads as well, so you know to clear that data.
     */
    public channel_ids?: Snowflake[];

    /**
     * All active threads in the given channels that the current user can access
     */
    public threads: DiscordChannel[];

    /**
     * All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to
     */
    public members: DiscordThreadMember[];

    constructor(guild_id: Snowflake, threads: DiscordChannel[], members: DiscordThreadMember[]) {
        this.guild_id = guild_id;
        this.threads = threads;
        this.members = members;
    }

    static fromJson(json: any): DiscordThreadListSync {
        const newInst = new DiscordThreadListSync(json.guild_id, json.threads, json.members);
        newInst.channel_ids = json.channel_ids;
        return newInst;
    }
}