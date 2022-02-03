/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '..';
import DiscordUser from './discord-user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class DiscordRole {

    public id: Snowflake;	            // Role id
    public name: string;                // Role name
    // color	integer	integer representation of hexadecimal color code
    // hoist	boolean	if this role is pinned in the user listing
    // icon?	?string	role icon hash
    // unicode_emoji?	?string	role unicode emoji
    // position	integer	position of this role
    public permissions: number;		    // Permission bit set
    // managed	boolean	whether this role is managed by an integration
    // mentionable	boolean	whether this role is mentionable
    // tags?	role tags object	the tags this role has
    constructor(id: Snowflake, name: string, permissions: number) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }

    static fromJson(json: any): DiscordRole {
        const newInst = new DiscordRole(json.id, json.name, json.permissions);
        return newInst;
    }
}