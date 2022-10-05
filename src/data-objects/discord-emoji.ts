/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordRole } from './discord-role';
import { DiscordUser } from './discord-user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordEmoji {

    /**
     * Emoji id
     */
    public id?: Snowflake;

    /**
     * (can be null only in reaction emoji objects)	emoji name
     */
    public name?: string;

    /**
     * Roles allowed to use this emoji
     */
    public roles: DiscordRole[] = [];

    /**
     * user object	user that created this emoji
     */
    public user?: DiscordUser;

    /**
     * Whether this emoji must be wrapped in colons
     */
    public require_colons?: boolean;

    /**
     * Whether this emoji is managed
     */
    public managed?: boolean;

    /**
     * Whether this emoji is animated
     */
    public animated?: boolean;

    /**
     * Whether this emoji can be used, may be false due to loss of Server Boosts
     */
    public available?: boolean;

    static fromJson(json: any): DiscordEmoji {
        const newInst = new DiscordEmoji();
        newInst.id = json.id;
        newInst.name = json.name;
        newInst.roles = json.roles?.map((r: any) => DiscordRole.fromJson(r)) ?? [];
        newInst.user = json.user && DiscordUser.fromJson(json.user);
        newInst.require_colons = json.require_colons;
        newInst.managed = json.managed;
        newInst.animated = json.animated;
        newInst.available = json.available;
        return newInst;
    }
}