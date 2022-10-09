import { DiscordMessageType } from '../custom-types';
import { Snowflake } from '../custom-types/snowflake';
import { DiscordEmbed } from './discord-embed';
import { DiscordGuildMember } from './discord-guild-member';
import { DiscordMessageBase } from './discord-message-base';
import DiscordReaction from './discord-reaction';
import { DiscordUser } from './discord-user';
import * as DiscordAPI from '../api/discord-api';

export class DiscordMessage extends DiscordMessageBase {

    /**
     * The author of this message(not guaranteed to be a valid user)
     */
    public author: DiscordUser;

    /**
     * Contents of the message
     */
    public content: string;

    /**
     * Timestamp when this message was sent
     */
    public timestamp: string;

    /**
     * Whether this message is pinned
     */
    public pinned: boolean;

    /**
     * Type of message
     */
    public type: DiscordMessageType;

    constructor(
        id: Snowflake,
        channel_id: Snowflake,
        author: DiscordUser,
        content: string,
        timestamp: string,
        pinned: boolean,
        type: DiscordMessageType
    ) {
        super(id, channel_id);
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.pinned = pinned;
        this.type = type;
    }

    static fromJson(json: any): DiscordMessage {
        const newInst = new DiscordMessage(
            json.id,
            json.channel_id,
            DiscordUser.fromJson(json.author),
            json.content,
            json.timestamp,
            json.pinned,
            json.type
        );

        newInst.guild_id = json.guild_id;
        newInst.member = DiscordGuildMember.fromJson(json.member ?? {}, newInst.author);
        newInst.edited_timestamp = json.edited_timestamp;
        newInst.tts = json.tts;
        newInst.mention_everyone = json.mention_everyone;
        newInst.mentions = json.mentions?.map(DiscordUser.fromJson) ?? [];
        newInst.reactions = json.reactions?.map(DiscordReaction.fromJson) ?? [];
        newInst.embeds = json.embeds?.map(DiscordEmbed.fromJson) ?? [];
        newInst.nonce = json.nonce;
        newInst.application_id = json.application_id;
        newInst.flags = json.flags;
        return newInst;
    }

    public createThreadOnMessage(name: string, autoArchiveDuration?: number, rateLimitPerUser?: number) {
        return DiscordAPI.startThreadFromMessage(this.channel_id, this.id, name, autoArchiveDuration, rateLimitPerUser);
    }
}