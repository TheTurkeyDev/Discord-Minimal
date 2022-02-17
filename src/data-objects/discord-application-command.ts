/* eslint-disable @typescript-eslint/no-explicit-any */

import { DiscordApplicationCommandOption } from ".";
import { DiscordApplicationCommandType, Snowflake } from "..";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordApplicationCommand
{
    public id?: Snowflake;	                                // Unique id of the command
    public type: DiscordApplicationCommandType; 	        // One of application command type the type of command, defaults 1 if not set
    public application_id: Snowflake;                       // Unique id of the parent application
    public guild_id?: Snowflake;                            // Guild id of the command, if not global
    public name: string;                                    // 1 - 32 character name
    public description: string;                             // 1 - 100 character description for CHAT_INPUT commands, empty string for USER and MESSAGE commands
    public options: DiscordApplicationCommandOption[] = []; // The parameters for the command, max 25	CHAT_INPUT
    public default_permission?: boolean;                    // Whether the command is enabled by default when the app is added to a guild
    public version?: Snowflake;                             // Autoincrementing version identifier updated during substantial record changes

    constructor(application_id: Snowflake, name: string, description: string)
    {
        this.application_id = application_id;
        this.name = name;
        this.description = description;
        this.type = DiscordApplicationCommandType.CHAT_INPUT;
    }

    static fromJson(json: any): DiscordApplicationCommand
    {
        const newInst = new DiscordApplicationCommand(json.application_id, json.name, json.description);
        newInst.id = json.id;
        newInst.type = json.type;
        newInst.guild_id = json.guild_id;
        newInst.options = json.options?.map(DiscordApplicationCommandOption.fromJson) ?? [];
        newInst.default_permission = json.default_permission;
        newInst.version = json.version;
        return newInst;
    }

    public setType(type: DiscordApplicationCommandType): DiscordApplicationCommand
    {
        this.type = type;
        return this;
    }

    public addOption(...options: DiscordApplicationCommandOption[]): DiscordApplicationCommand
    {
        this.options.push(...options);
        return this;
    }
}