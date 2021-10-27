/* eslint-disable @typescript-eslint/no-explicit-any */

import DiscordUser from './discord-user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class DiscordGuildMember {
    public user?: DiscordUser;              // The user this guild member represents
    public nick?: string;	                // This users guild nickname
    // public avatar?	?string	the member's guild avatar hash
    // public roles	array of snowflakes	array of role object ids
    // public joined_at	ISO8601 timestamp	when the user joined the guild
    // public premium_since?	?ISO8601 timestamp	when the user started boosting the guild
    // public deaf	boolean	whether the user is deafened in voice channels
    // public mute	boolean	whether the user is muted in voice channels
    // public pending?	boolean	whether the user has not yet passed the guild's Membership Screening requirements
    // public permissions?	string	total permissions of the member in the channel, including overwrites, returned when in the interaction object

    constructor(json: any) {
        this.user = json.user ? new DiscordUser(json.user) : undefined;
        this.nick = json.nick;
    }
}