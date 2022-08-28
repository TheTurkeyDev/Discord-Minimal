/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordUser } from './discord-user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordGuildMember {

    /**
     * The user this guild member represents
     */
    public user?: DiscordUser;

    /**
     * This users guild nickname
     */
    public nick?: string;

    /**
     * The member's guild avatar hash
     */
    public avatar?: string;

    /**
     * Array of role object ids
     */
    public roles: Snowflake[] = [];

    // public joined_at	ISO8601 timestamp	when the user joined the guild
    // public premium_since?	?ISO8601 timestamp	when the user started boosting the guild
    // public deaf	boolean	whether the user is deafened in voice channels
    // public mute	boolean	whether the user is muted in voice channels
    // public pending?	boolean	whether the user has not yet passed the guild's Membership Screening requirements

    /**
     * Total permissions of the member in the channel, including overwrites, returned when in the interaction object
     */
    public permissions?: string;

    static fromJson(json: any, parentUser: DiscordUser | undefined = undefined): DiscordGuildMember {
        const newInst = new DiscordGuildMember();
        newInst.user = json.user ? DiscordUser.fromJson(json.user) : parentUser;
        newInst.nick = json.nick;
        newInst.avatar = json.avatar;
        newInst.roles = json.roles ?? [];
        newInst.permissions = json.permissions;
        return newInst;
    }
}