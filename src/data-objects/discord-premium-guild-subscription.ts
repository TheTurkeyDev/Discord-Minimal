import { DiscordUser } from '..';
import { Snowflake } from '../custom-types';

export class DiscordPremiumGuildSubscription {
    /**
     * The ID of the premium guild subscription
     */
    public id: Snowflake;

    /**
    * The ID of the guild this subscription is for
    */
    public guild_id: Snowflake;

    /**
    * The ID of the user who created this premium guild subscription
    */
    public user_id: Snowflake;

    /**
    * If this premium guild subscription has ended
    */
    public ended: boolean;

    /**
    * When this premium guild subscription will expire
    */
    public ends_at?: string;

    /**
    * When the user's overall subscription pause will end, reactivating the premium guild subscription
    */
    public pause_ends_at?: string;

    /**
    * Partial user object	
    * The user this premium guild subscription is for
    */
    public user?: DiscordUser;

    constructor(
        id: Snowflake,
        guild_id: Snowflake,
        user_id: Snowflake,
        ended: boolean,
    ) {
        this.id = id;
        this.guild_id = guild_id;
        this.user_id = user_id;
        this.ended = ended;
    }

    static fromJson(json: any): DiscordPremiumGuildSubscription {
        const newInst = new DiscordPremiumGuildSubscription(
            json.id,
            json.guild_id,
            json.user_id,
            json.ended
        );

        newInst.ends_at = json.ends_at;
        newInst.pause_ends_at = json.pause_ends_at;
        newInst.user = json.user && DiscordUser.fromJson(json.user);
        return newInst;
    }

}