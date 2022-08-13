/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';


/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordRole {

    /**
     * Role id
     */
    public id: Snowflake;

    /**
     * Role name
     */
    public name: string;

    /**
     * Integer representation of hexadecimal color code
     */
    public color: number;

    /**
     * If this role is pinned in the user listing
     */
    public hoist: boolean;

    /**
     * Role icon hash
     */
    public icon?: string;

    /**
     * Role unicode emoji
     */
    public unicode_emoji?: string;

    /**
     * Position of this role
     */
    public position: number;

    /**
     * Permission bit set
     */
    public permissions: number;
    // managed	boolean	whether this role is managed by an integration
    // mentionable	boolean	whether this role is mentionable
    // tags?	role tags object	the tags this role has
    constructor(id: Snowflake, name: string, permissions: number, color: number, hoist: boolean, position: number) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
        this.color = color;
        this.hoist = hoist;
        this.position = position;
    }

    static fromJson(json: any): DiscordRole {
        const newInst = new DiscordRole(json.id, json.name, json.permissions, json.color, json.hoist, json.position);
        newInst.icon = json.icon;
        newInst.unicode_emoji = json.unicode_emoji;
        return newInst;
    }
}