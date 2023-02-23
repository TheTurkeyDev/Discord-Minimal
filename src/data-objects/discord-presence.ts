import { DiscordUserStatus, Snowflake } from '../custom-types';
import { DiscordUser } from './discord-user';

export class DiscordPresence {
    /**
     * User whose presence is being updated
     */
    user: DiscordUser;
    /**
     * ID of the guild
     */
    guild_id: Snowflake;
    /**
     * Either "idle", "dnd", "online", or "offline"
     */
    status: DiscordUserStatus;
    // activities	array of activity objects	User's current activities
    // client_status	client_status object	User's platform-dependent status

    constructor(user: DiscordUser, guild_id: Snowflake, status: DiscordUserStatus) {
        this.user = user;
        this.guild_id = guild_id;
        this.status = status;
    }

    static fromJson(json: any): DiscordPresence {
        const newInst = new DiscordPresence(DiscordUser.fromJson(json.user), json.guild_id, json.status);
        return newInst;
    }
}