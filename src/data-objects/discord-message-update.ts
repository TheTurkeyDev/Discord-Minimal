/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Snowflake } from '../custom-types/snowflake';
import { DiscordEmbed } from './discord-embed';
import { DiscordGuildMember } from './discord-guild-member';
import { DiscordMessageBase } from './discord-message-base';
import DiscordReaction from './discord-reaction';
import { DiscordUser } from './discord-user';

export class DiscordMessageUpdate extends DiscordMessageBase {

    // Message Update only returns `id`, `embeds`, `channel_id`, and `guild_id`
    constructor(id: Snowflake, channel_id: Snowflake) {
        super(id, channel_id);
    }

    static fromJson(json: any): DiscordMessageUpdate {
        const newInst = new DiscordMessageUpdate(
            json.id,
            json.channel_id,
        );

        newInst.author = json.author && DiscordUser.fromJson(json.author);
        newInst.content = json.content;
        newInst.timestamp = json.timestamp;
        newInst.pinned = json.pinned;
        newInst.type = json.type;
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
}