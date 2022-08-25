/* eslint-disable @typescript-eslint/no-explicit-any */

import { DiscordApplicationCommandType } from '../custom-types/discord-application-command-type';
import { Snowflake } from '../custom-types/snowflake';
import { DiscordApplicationCommandOption } from './discord-application-command-option';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class DiscordApplicationCommand {

    /**
     * Unique id of the command
     */
    public id?: Snowflake;

    /**
     * One of application command type the type of command, defaults 1 if not set
     */
    public type: DiscordApplicationCommandType;

    /**
     * Unique id of the parent application
     */
    public application_id: Snowflake;

    /**
     * Guild id of the command, if not global
     */
    public guild_id?: Snowflake;

    /**
     * 1 - 32 character name
     */
    public name: string;

    /**
     * Localization dictionary for the name field. Values follow the same restrictions as name
     */
    public name_localizations?: { [key: string]: string };

    /**
     * 1 - 100 character description for CHAT_INPUT commands, empty string for USER and MESSAGE commands
     */
    public description: string;

    /**
     * Localization dictionary for the description field. Values follow the same restrictions as description
     */
    public description_localizations?: { [key: string]: string };

    /**
     * The parameters for the command, max 25	CHAT_INPUT
     */
    public options: DiscordApplicationCommandOption[] = [];

    /**
     * Whether the command is enabled by default when the app is added to a guild
     */
    public default_permission?: boolean;

    /**
     * Autoincrementing version identifier updated during substantial record changes
     */
    public version?: Snowflake;

    constructor(application_id: Snowflake, name: string, description: string) {
        this.application_id = application_id;
        this.name = name;
        this.description = description;
        this.type = DiscordApplicationCommandType.CHAT_INPUT;
    }

    static fromJson(json: any): DiscordApplicationCommand {
        const newInst = new DiscordApplicationCommand(json.application_id, json.name, json.description);
        newInst.id = json.id;
        newInst.type = json.type;
        newInst.guild_id = json.guild_id;
        newInst.options = json.options?.map(DiscordApplicationCommandOption.fromJson) ?? [];
        newInst.default_permission = json.default_permission;
        newInst.version = json.version;
        return newInst;
    }

    public setType(type: DiscordApplicationCommandType): DiscordApplicationCommand {
        this.type = type;
        return this;
    }

    public addOption(...options: DiscordApplicationCommandOption[]): DiscordApplicationCommand {
        this.options.push(...options);
        return this;
    }
}