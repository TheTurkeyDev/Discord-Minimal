import { Snowflake } from '../custom-types/snowflake';

export class DiscordGuildJoinRequestDelete {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;

    /**
     * The ID of the join request
     */
    public id: Snowflake;

    /**
     * 	The ID of the user who created the join request
     */
    public user_id: Snowflake;

    constructor(guild_id: Snowflake, id: Snowflake, user_id: Snowflake) {
        this.guild_id = guild_id;
        this.id = id;
        this.user_id = user_id;
    }

    static fromJson(json: any): DiscordGuildJoinRequestDelete {
        const newInst = new DiscordGuildJoinRequestDelete(
            json.guild_id,
            json.id,
            json.user_id
        );
        return newInst;
    }
}