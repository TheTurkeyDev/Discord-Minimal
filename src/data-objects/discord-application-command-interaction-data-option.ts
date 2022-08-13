/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DiscordApplicationCommandOptionType } from '../custom-types/discord-application-command-option-type';

export default class DiscordApplicationCommandInteractionDataOption {
    /**
     * The name of the parameter
     */
    public name: string;

    /**
     * Value of application command option type
     */
    public type: DiscordApplicationCommandOptionType;

    /**
     * The value of the option resulting from user input
     */
    public value?: string | number;

    /**
     * Present if this option is a group or subcommand
     */
    public options?: DiscordApplicationCommandInteractionDataOption[];

    /**
     * true if this option is the currently focused option for autocomplete
     */
    public focused?: boolean;

    constructor(name: string, type: DiscordApplicationCommandOptionType) {
        this.name = name;
        this.type = type;
    }

    static fromJson(json: any): DiscordApplicationCommandInteractionDataOption {
        const newInst = new DiscordApplicationCommandInteractionDataOption(json.name, json.type);
        newInst.value = json.value;
        newInst.options = json.options?.map(DiscordApplicationCommandInteractionDataOption.fromJson);
        newInst.focused = json.focused;
        return newInst;
    }

}