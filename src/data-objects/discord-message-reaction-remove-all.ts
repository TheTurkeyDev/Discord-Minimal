/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '../custom-types/snowflake';

export class DiscordMessageReactionRemoveAll {
    public channel_id!: Snowflake;      // The id of the channel
    public message_id!: Snowflake;      // The id of the message
    public guild_id?: Snowflake;         // The id of the guild

    constructor(channel_id: Snowflake, message_id: Snowflake) {
        this.channel_id = channel_id;
        this.message_id = message_id;
    }

    static fromJson(json: any): DiscordMessageReactionRemoveAll {
        const newInst = new DiscordMessageReactionRemoveAll(
            json.channel_id,
            json.message_id
        );
        newInst.guild_id = json.guild_id;
        return newInst;
    }
}