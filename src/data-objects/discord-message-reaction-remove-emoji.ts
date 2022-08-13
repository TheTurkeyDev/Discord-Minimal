/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordEmoji } from './discord-emoji';

export class DiscordMessageReactionRemoveEmoji {
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
    public emoji!: DiscordEmoji;

    constructor(channel_id: Snowflake, message_id: Snowflake, emoji: DiscordEmoji) {
        this.channel_id = channel_id;
        this.message_id = message_id;
        this.emoji = emoji;
    }

    static fromJson(json: any): DiscordMessageReactionRemoveEmoji {
        const newInst = new DiscordMessageReactionRemoveEmoji(
            json.channel_id,
            json.message_id,
            DiscordEmoji.fromJson(json.emoji)
        );
        newInst.guild_id = json.guild_id;
        return newInst;
    }
}