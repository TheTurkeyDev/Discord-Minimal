/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordUser } from './discord-user';

export class DiscordGuildMemberUpdate {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;

    /**
     * User role ids
     */
    public roles: Snowflake[];

    /**
     * The user
     */
    public user: DiscordUser;

    /**
     * Nickname of the user in the guild
     */
    public nick?: string;

    /**
     * The member's guild avatar hash
     */
    public avatar?: string;

    /**
     * When the user joined the guild (ISO8601 timestamp)
     */
    public joined_at?: string;

    /**
     * When the user starting boosting the guild (ISO8601 timestamp)
     */
    public premium_since?: string;

    /**
     * Whether the user is deafened in voice channels
     */
    public deaf?: boolean;

    /**
     * Whether the user is muted in voice channels
     */
    public mute?: boolean;

    /**
     * Whether the user has not yet passed the guild's Membership Screening requirements
     */
    public pending?: boolean;

    /**
     * When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out (ISO8601 timestamp)
     */
    public communication_disabled_until?: boolean;

    constructor(guild_id: Snowflake, roles: Snowflake[], user: DiscordUser) {
        this.guild_id = guild_id;
        this.roles = roles;
        this.user = user;
    }

    static fromJson(json: any): DiscordGuildMemberUpdate {
        const newInst = new DiscordGuildMemberUpdate(json.guild_id, json.roles, DiscordUser.fromJson(json.user));
        newInst.nick = json.nick;
        newInst.avatar = json.avatar;
        newInst.joined_at = json.joined_at;
        newInst.premium_since = json.premium_since;
        newInst.deaf = json.deaf;
        newInst.mute = json.mute;
        newInst.pending = json.pending;
        newInst.communication_disabled_until = json.communication_disabled_until;
        return newInst;
    }
}