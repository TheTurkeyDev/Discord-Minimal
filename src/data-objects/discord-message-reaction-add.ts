/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Snowflake } from '../custom-types/snowflake';
import DiscordEmoji from './discord-emoji';
import DiscordGuildMember from './discord-guild-memeber';
import * as DiscordAPI from '../api/discord-api';

export default class DiscordMessageReactionAdd {
    public user_id!: Snowflake;         // The id of the user
    public channel_id!: Snowflake;      // The id of the channel
    public message_id!: Snowflake;      // The id of the message
    public guild_id?: Snowflake         // The id of the guild
    public member?: DiscordGuildMember; // The member who reacted if this happened in a guild
    public emoji!: DiscordEmoji;     	// A partial emoji object, the emoji used to react

    constructor(json: any) {
        this.user_id = json.user_id;
        this.channel_id = json.channel_id;
        this.message_id = json.message_id;
        this.guild_id = json.guild_id;
        this.member = new DiscordGuildMember(json.member);
        this.emoji = new DiscordEmoji(json.emoji);
    }

    public removeUser(userId: Snowflake): Promise<void> {
        return DiscordAPI.deleteUserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', userId);
    }

    public remove(): Promise<void> {
        return DiscordAPI.deleteUserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', this.user_id);
    }
}