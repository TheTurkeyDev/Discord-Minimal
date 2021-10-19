import { Snowflake } from '../custom-types/snowflake';
import DiscordEmoji from './discord-emoji';
import DiscordGuildMember from './discord-guild-memeber';
import * as DiscordAPI from '../discord-api';

export default class DiscordMessageReactionAdd {
    public user_id!: Snowflake;         // The id of the user
    public channel_id!: Snowflake;      // The id of the channel
    public message_id!: Snowflake;      // The id of the message
    public guild_id?: Snowflake         // The id of the guild
    public member?: DiscordGuildMember; // The member who reacted if this happened in a guild
    public emoji!: DiscordEmoji;     	// A partial emoji object, the emoji used to react

    public removeUser(userId: Snowflake): void {
        DiscordAPI.deleteuserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', userId);
    }

    public remove(): void {
        DiscordAPI.deleteuserReaction(this.channel_id, this.message_id, this.emoji.name ?? '', this.user_id);
    }
}