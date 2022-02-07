/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DiscordEmoji, DiscordGuildMember, Snowflake } from '..';
import * as DiscordAPI from '../api/discord-api';

export default class DiscordMessageReactionAdd {
    public user_id!: Snowflake;         // The id of the user
    public channel_id!: Snowflake;      // The id of the channel
    public message_id!: Snowflake;      // The id of the message
    public guild_id?: Snowflake;         // The id of the guild
    public member?: DiscordGuildMember; // The member who reacted if this happened in a guild
    public emoji!: DiscordEmoji;     	// A partial emoji object, the emoji used to react

    constructor(user_id: Snowflake, channel_id: Snowflake, message_id: Snowflake, emoji: DiscordEmoji) {
        this.user_id = user_id;
        this.channel_id = channel_id;
        this.message_id = message_id;
        this.emoji = emoji;
    }

    static fromJson(json: any): DiscordMessageReactionAdd {
        const newInst = new DiscordMessageReactionAdd(
            json.user_id,
            json.channel_id,
            json.message_id,
            DiscordEmoji.fromJson(json.emoji)
        );
        newInst.guild_id = json.guild_id;
        newInst.member = json.member && DiscordGuildMember.fromJson(json.member);
        return newInst;
    }

    public removeUser(userId: Snowflake): Promise<void> {
        return DiscordAPI.deleteUserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', userId);
    }

    public remove(): Promise<void> {
        return DiscordAPI.deleteUserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', this.user_id);
    }
}