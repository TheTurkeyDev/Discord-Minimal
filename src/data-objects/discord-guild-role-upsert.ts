/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordRole } from './discord-role';

export class DiscordGuildRoleUpsert {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;
    
    /**
     * The role created or updated
     */
    public role: DiscordRole;

    constructor(guild_id: Snowflake, role: DiscordRole) {
        this.guild_id = guild_id;
        this.role = role;
    }

    static fromJson(json: any): DiscordGuildRoleUpsert {
        const newInst = new DiscordGuildRoleUpsert(json.guild_id, DiscordRole.fromJson(json.role));
        return newInst;
    }
}