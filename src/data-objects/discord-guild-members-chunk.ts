import { Snowflake } from '../custom-types';
import { DiscordGuildMember } from './discord-guild-member';
import { DiscordPresence } from './discord-presence';

export class DiscordGuildMembersChunk {
    /**
     * ID of the guild
     */
    guild_id: Snowflake;
    /**
     * Set of guild members
     */
    members: DiscordGuildMember[];
    /**
     * Chunk index in the expected chunks for this response(0 <= chunk_index < chunk_count)
     */
    chunk_index: number;
    /**
     * Total number of expected chunks for this response
     */
    chunk_count: number;
    /**
     * When passing an invalid ID to REQUEST_GUILD_MEMBERS, it will be returned here
     */
    not_found?: string[];
    /**
     * When passing true to REQUEST_GUILD_MEMBERS, presences of the returned members will be here
     */
    presences?: DiscordPresence[];
    /**
     * Nonce used in the Guild Members Request
     */
    nonce?: string;

    constructor(guild_id: Snowflake, members: DiscordGuildMember[], chunk_index: number, chunk_count: number) {
        this.guild_id = guild_id;
        this.members = members;
        this.chunk_index = chunk_index;
        this.chunk_count = chunk_count;
    }

    static fromJson(json: any): DiscordGuildMembersChunk {
        const newInst = new DiscordGuildMembersChunk(
            json.guild_id,
            json.members?.map(DiscordGuildMember.fromJson) ?? [],
            json.chunk_index,
            json.chunk_count
        );
        newInst.not_found = json.not_found;
        newInst.presences = json.presences?.map(DiscordPresence.fromJson);
        newInst.nonce = json.nonce;
        return newInst;
    }
}