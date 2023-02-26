import { Snowflake } from '../custom-types';

export class DiscordMessageDeleteBulk {

    /**
     * The ids of the messages
     */
    public ids: Snowflake[];

    /**
     * The id of the channel
     */
    public channel_id: Snowflake;

    /**
     * The id of the guild
     */
    public guild_id?: Snowflake;

    constructor(ids: Snowflake[], channel_id: Snowflake) {
        this.ids = ids;
        this.channel_id = channel_id;
    }

    static fromJson(json: any): DiscordMessageDeleteBulk {
        const newInst = new DiscordMessageDeleteBulk(json.ids, json.channel_id);
        newInst.guild_id = json.guild_id;
        return newInst;
    }

}