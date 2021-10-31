/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Snowflake } from '../custom-types/snowflake';
import DiscordComponent from './discord-component';
import DiscordEmbed from './discord-embed';

export default class DiscordMessageDeleteBulk {
    public ids!: Snowflake[];           // The ids of the messages
    public channel_id!: Snowflake;      // The id of the channel
    public guild_id?: Snowflake;	    // The id of the guild

    constructor(json: any) {
        this.ids = json.ids;
        this.channel_id = json.channel_id;
        this.guild_id = json.guild_id;
    }
}