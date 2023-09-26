/* eslint-disable @typescript-eslint/no-explicit-any */

import { Snowflake } from '../custom-types/snowflake';
import { DiscordRole } from './discord-role';
import { DiscordUser } from './discord-user';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordEntitlement {

    /**
     * ID of the entitlement
     */
    public id: Snowflake;

    /**
     * ID of the SKU
     */
    public sku_id: Snowflake;

    /**
     * ID of the user that is granted access to the entitlement's sku
     */
    public user_id?: Snowflake;

    /**
     * ID of the guild that is granted access to the entitlement's sku
     */
    public guild_id?: Snowflake;

    /**
     * ID of the parent application
     */
    public application_id: Snowflake;

    /**
     * Type of entitlement
     */
    public type: number;

    // consumed	boolean	Not applicable for App Subscriptions. Subscriptions are not consumed and will be false

    /**
     * ISO8601 timestamp	Start date at which the entitlement is valid. Not present when using test entitlements.
     */
    public starts_at?: string; 

    /**
     * ISO8601 timestamp	Date at which the entitlement is no longer valid. Not present when using test entitlements.
     */
    public ends_at?: string; 

    constructor(id: Snowflake, sku_id: Snowflake, application_id: Snowflake, type: number) {
        this.id = id;
        this.sku_id = sku_id;
        this.application_id = application_id;
        this.type = type;
    }

    static fromJson(json: any): DiscordEntitlement {
        const newInst = new DiscordEntitlement(json.id, json.sku_id, json.application_id, json.type);
        newInst.user_id = json.user_id;
        newInst.guild_id = json.guild_id;
        newInst.starts_at = json.starts_at;
        newInst.ends_at = json.ends_at;

        return newInst;
    }
}