import { Snowflake } from '../custom-types';
import { DiscordEntitlement } from './discord-entitlement';

export class DiscordGuildPowerupEntitlements {

    /**
    * The ID of the guild
    */
    public guild_id: Snowflake;

    /**
    * The created powerup entitlements
    */
    public entitlements: DiscordEntitlement[];

    constructor(guild_id: Snowflake, entitlements: DiscordEntitlement[]) {
        this.guild_id = guild_id;
        this.entitlements = entitlements;
    }

    static fromJson(json: any): DiscordGuildPowerupEntitlements {
        const newInst = new DiscordGuildPowerupEntitlements(
            json.id,
            json.entitlements.map(DiscordEntitlement.fromJson)
        );
        return newInst;
    }
}