/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordUser } from './discord-user';

export class DiscordGuildMemberRemove {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;
    
    /**
     * The user who was removed
     */
    public user: DiscordUser;

    constructor(guild_id: Snowflake, user: DiscordUser) {
        this.guild_id = guild_id;
        this.user = user;
    }

    static fromJson(json: any): DiscordGuildMemberRemove {
        const newInst = new DiscordGuildMemberRemove(json.guild_id, DiscordUser.fromJson(json.user));
        return newInst;
    }
}