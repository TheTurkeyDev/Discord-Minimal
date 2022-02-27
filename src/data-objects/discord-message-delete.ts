/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '../custom-types/snowflake';

export class DiscordMessageDelete {
    public id!: Snowflake;              // The id of the message
    public channel_id!: Snowflake;      // The id of the channel
    public guild_id?: Snowflake;	    // The id of the guild

    constructor(id: Snowflake, channel_id: Snowflake) {
        this.id = id;
        this.channel_id = channel_id;
    }

    static fromJson(json: any): DiscordMessageDelete {
        const newInst = new DiscordMessageDelete(json.id, json.channel_id);
        newInst.guild_id = json.guild_id;
        return newInst;
    }
}