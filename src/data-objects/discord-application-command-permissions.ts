import { Snowflake } from '../custom-types';

export class DiscordApplicationCommandPermissions {

    /**
     * ID of the command or the application ID
     */
    public id: Snowflake;

    /**
     * ID of the application the command belongs to
     */
    public application_id: Snowflake;

    /**
     * ID of the guild
     */
    public guild_id: Snowflake;

    // permissions	array of application command permissions	Permissions for the command in the guild, max of 100

    constructor(id: Snowflake, application_id: Snowflake, guild_id: Snowflake) {
        this.id = id;
        this.application_id = application_id;
        this.guild_id = guild_id;
    }

    static fromJson(json: any): DiscordApplicationCommandPermissions {
        const newInst = new DiscordApplicationCommandPermissions(json.id, json.application_id, json.guild_id);
        return newInst;
    }

}