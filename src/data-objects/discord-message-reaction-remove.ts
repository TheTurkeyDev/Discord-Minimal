import { Snowflake } from '../custom-types';
import { DiscordEmoji } from './discord-emoji';

export class DiscordMessageReactionRemove {

    /**
     * The id of the user
     */
    public user_id: Snowflake;

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

    /**
     * A partial emoji object, the emoji used to react
     */
    public emoji: DiscordEmoji;

    constructor(user_id: Snowflake, channel_id: Snowflake, message_id: Snowflake, emoji: DiscordEmoji) {
        this.user_id = user_id;
        this.channel_id = channel_id;
        this.message_id = message_id;
        this.emoji = emoji;
    }

    static fromJson(json: any): DiscordMessageReactionRemove {
        const newInst = new DiscordMessageReactionRemove(
            json.user_id,
            json.channel_id,
            json.message_id,
            DiscordEmoji.fromJson(json.emoji)
        );
        newInst.guild_id = json.guild_id;
        return newInst;
    }
}