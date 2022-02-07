/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DiscordApplicationCommandOptionType } from '..';

export default class DiscordApplicationCommandInteractionDataOption {
    public name: string;                                                 // The name of the parameter
    public type: DiscordApplicationCommandOptionType;                   // Value of application command option type
    public value?: string | number;                                     // The value of the option resulting from user input
    public options?: DiscordApplicationCommandInteractionDataOption[];	// Present if this option is a group or subcommand
    public focused?: boolean;	                                        // true if this option is the currently focused option for autocomplete

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