/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Snowflake } from '../custom-types/snowflake';
import DiscordComponent from './discord-component';
import DiscordEmbed from './discord-embed';

export default class DiscordMessageDelete {
    public id!: Snowflake;              // The id of the message
    public channel_id!: Snowflake;      // The id of the channel
    public guild_id?: Snowflake;	    // The id of the guild

    constructor(json: any) {
        this.id = json.id;
        this.channel_id = json.channel_id;
        this.guild_id = json.guild_id;
    }
}