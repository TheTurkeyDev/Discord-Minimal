/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '..';

export class DiscordMessageDeleteBulk
{
    public ids!: Snowflake[];           // The ids of the messages
    public channel_id!: Snowflake;      // The id of the channel
    public guild_id?: Snowflake;	    // The id of the guild

    constructor(ids: Snowflake[], channel_id: Snowflake)
    {
        this.ids = ids;
        this.channel_id = channel_id;
    }

    static fromJson(json: any): DiscordMessageDeleteBulk {
        const newInst = new DiscordMessageDeleteBulk(json.ids, json.channel_id);
        newInst.guild_id = json.guild_id;
        return newInst;
    }

}