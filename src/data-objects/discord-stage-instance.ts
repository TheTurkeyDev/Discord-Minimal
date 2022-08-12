import { Snowflake } from '../custom-types';

export class DiscordStageInstance {

    /**
     * The id of this Stage instance
     */
    public id: Snowflake;

    /**
     * The guild id of the associated Stage channel
     */
    public guild_id: Snowflake;

    /**
     * The id of the associated Stage channel
     */
    public channel_id: Snowflake;

    /**
     * The topic of the Stage instance(1 - 120 characters)
     */
    public topic: string;

    /**
     * 	The privacy level of the Stage instance
     */
    public privacy_level: number;

    /**
     * Whether or not Stage Discovery is disabled(deprecated)
     */
    public discoverable_disabled?: boolean;

    /**
     * The id of the scheduled event for this Stage instance
     */
    public guild_scheduled_event_id?: Snowflake;

    constructor(id: Snowflake, guild_id: Snowflake, channel_id: Snowflake, topic: string, privacy_level: number) {
        this.id = id;
        this.guild_id = guild_id;
        this.channel_id = channel_id;
        this.topic = topic;
        this.privacy_level = privacy_level;
    }

    static fromJson(json: any): DiscordStageInstance {
        const newInst = new DiscordStageInstance(
            json.id,
            json.guild_id,
            json.channel_id,
            json.topic,
            json.privacy_level
        );

        newInst.discoverable_disabled = json.discoverable_disabled;
        newInst.guild_scheduled_event_id = json.guild_scheduled_event_id;
        return newInst;
    }

}