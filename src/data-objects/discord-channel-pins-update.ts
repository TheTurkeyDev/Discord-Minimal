import { Snowflake } from '../custom-types';

export class DiscordChannelPinsUpdate {

    /**
     * The id of the guild
     */
    public guild_id?: Snowflake;

    /**
     * The id of the channel
     */
    public channel_id: Snowflake;

    /**
     * The time at which the most recent pinned message was pinned (ISO8601 timestamp)
     */
    public last_pin_timestamp?: string;

    constructor(channel_id: Snowflake) {
        this.channel_id = channel_id;
    }

    static fromJson(json: any): DiscordChannelPinsUpdate {
        const newInst = new DiscordChannelPinsUpdate(json.channel_id);
        newInst.guild_id = json.guild_id;
        newInst.last_pin_timestamp = json.last_pin_timestamp;
        return newInst;
    }

}