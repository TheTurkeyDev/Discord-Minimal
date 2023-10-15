import { Snowflake } from '../custom-types';
import * as DiscordAPI from '../api/discord-api';

export class DiscordUser {

    /**
     * The user's id
     */
    public id!: Snowflake;

    /**
     * The user's username, not unique across the platform
     */
    public username!: string;

    /**
     * The user's 4-digit discord-tag
     */
    public discriminator!: string;

    /**
     * The user's avatar hash
     */
    public avatar?: string;

    /**
     * Whether the user belongs to an OAuth2 application
     */
    public bot?: boolean;
    // public system ? boolean	whether the user is an Official Discord System user(part of the urgent message system)	identify
    // public mfa_enabled ? boolean	whether the user has two factor enabled on their account	identify
    // public banner ?	? string	the user's banner hash	identify
    // public accent_color ?	? integer	the user's banner color encoded as an integer representation of hexadecimal color code	identify
    // public locale ? string	the user's chosen language option	identify
    // public verified ? boolean	whether the email on this account has been verified	email
    // public email ?	? string	the user's email	email
    // public flags ? integer	the flags on a user's account	identify
    // public premium_type ? integer	the type of Nitro subscription on a user's account	identify
    // public public_flags ? integer	the public flags on a user's account	identify

    constructor(id: Snowflake, username: string, discriminator: string) {
        this.id = id;
        this.username = username;
        this.discriminator = discriminator;
    }

    static fromJson(json: any): DiscordUser {
        const newInst = new DiscordUser(json.id, json.username, json.discriminator);
        newInst.avatar = json.avatar;
        newInst.bot = json.bot;
        return newInst;
    }

    public setActivity(activity: string) {
        //TODO
    }

    public addGuildRole(guildId: Snowflake, roleId: Snowflake): Promise<void> {
        return DiscordAPI.addGuildMemberRole(guildId, this.id, roleId);
    }

    public removeGuildRole(guildId: Snowflake, roleId: Snowflake): Promise<void> {
        return DiscordAPI.removeGuildMemberRole(guildId, this.id, roleId);
    }
}