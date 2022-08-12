/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';

export class DiscordGuildRoleDelete {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;
    
    /**
     * The id of the role
     */
    public role_id: Snowflake;

    constructor(guild_id: Snowflake, role_id: Snowflake) {
        this.guild_id = guild_id;
        this.role_id = role_id;
    }

    static fromJson(json: any): DiscordGuildRoleDelete {
        const newInst = new DiscordGuildRoleDelete(json.guild_id, json.role_id);
        return newInst;
    }
}