/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
    DiscordApplicationCommandOptionChoiceStructure,
    DiscordApplicationCommandOptionType,
    DiscordChannelType
} from '..';

export default class DiscordApplicationCommandOption {
    public type: DiscordApplicationCommandOptionType;                                 // One of application command option type	the type of option
    public name: string;	                                                    // 1-32 character name
    public description: string;	                                                // 1 - 100 character description
    public required?: boolean;	                                                // If the parameter is required or optional--default false
    public choices: DiscordApplicationCommandOptionChoiceStructure[] = [];     // Types for the user to pick from, max 25
    public options: DiscordApplicationCommandOption[] = [];                    // Array of application command option if the option is a subcommand or subcommand group type, these nested options will be the parameters
    public channel_types: DiscordChannelType[] = [];	                        // If the option is a channel type, the channels shown will be restricted to these types
    public min_value?: number;                                                  // For INTEGER options, double for NUMBER options if the option is an INTEGER or NUMBER type, the minimum value permitted
    public max_value?: number;                                                  // For INTEGER options, double for NUMBER options	if the option is an INTEGER or NUMBER type, the maximum value permitted
    public autocomplete?: boolean;	                                            // If autocomplete interactions are enabled for this STRING, INTEGER, or NUMBER type option

    constructor(name: string, description: string, type: DiscordApplicationCommandOptionType) {
        this.name = name;
        this.description = description;
        this.type = type;
    }

    static fromJson(json: any): DiscordApplicationCommandOption {
        const newInst = new DiscordApplicationCommandOption(json.name, json.description, json.type);
        newInst.required = json.required;
        newInst.choices = json.choices?.map(DiscordApplicationCommandOptionChoiceStructure.fromJson) ?? [];
        newInst.options = json.options?.map(DiscordApplicationCommandOption.fromJson) ?? [];
        newInst.channel_types = json.channel_types ?? [];
        newInst.min_value = json.min_value;
        newInst.max_value = json.max_value;
        newInst.autocomplete = json.autocomplete;
        return newInst;
    }

    public setRequired(): DiscordApplicationCommandOption {
        this.required = true;
        return this;
    }

    public addChoiceKeyVal(key: string, value: string | number): DiscordApplicationCommandOption {
        this.choices.push(new DiscordApplicationCommandOptionChoiceStructure(key, value));
        return this;
    }

    public addChoice(choice: DiscordApplicationCommandOptionChoiceStructure): DiscordApplicationCommandOption {
        this.choices.push(choice);
        return this;
    }
}