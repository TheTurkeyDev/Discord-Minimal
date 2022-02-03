/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';

export default class DiscordUser {
    public id!: Snowflake;               // The user's id	identify
    public username!: string;            // The user's username, not unique across the platform	identify
    public discriminator!: string; 	    // The user's 4-digit discord-tag	identify
    // public avatar ? string	the user's avatar hash	identify
    // public bot ? boolean	whether the user belongs to an OAuth2 application	identify
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
        return newInst;
    }

    public setActivity(activity: string) {
        //TODO
    }
}