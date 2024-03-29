import { Snowflake } from '../custom-types';

export class DiscordMessageReactionRemoveAll {

    /**
     * The id of the channel
     */
    public channel_id: Snowflake;

    /**
     * The id of the message
     */
    public message_id: Snowflake;

    /**
     * The id of the guild
     */
    public guild_id?: Snowflake;

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