/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordSelectOption, Snowflake } from '..';
import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordApplicationCommandInteractionDataOption from './discord-application-command-interaction-data-option';
import DiscordInteractionResolvedData from './discord-interaction-resolved-data';

export default class DiscordInteractionData {
    public id: Snowflake;                                                   // The ID of the invoked command
    public name: string;	                                                // The name of the invoked command
    public type: number;                                                    // The type of the invoked command
    public resolved?: DiscordInteractionResolvedData;                       // Converted users + roles + channels
    public options: DiscordApplicationCommandInteractionDataOption[] = [];  // The params + values from the user
    public custom_id?: string;	                                            // The custom_id of the component
    public component_type?: DiscordComponentType;                           // The type of the component
    public values: string[] = [];                                           // The values the user selected
    public target_id?: Snowflake;                                           // Id the of user or message targetted by a user or message command

    constructor(id: Snowflake, name: string, type: number) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    static fromJson(json: any): DiscordInteractionData {
        const newInst = new DiscordInteractionData(json.id, json.name, json.type);
        newInst.resolved = json.resolved && DiscordInteractionResolvedData.fromJson(json.resolved);
        newInst.options = json.options?.map(DiscordApplicationCommandInteractionDataOption.fromJson) ?? [];
        newInst.custom_id = json.custom_id;
        newInst.component_type = json.component_type;
        newInst.values = json.values;
        newInst.target_id = json.target_id;
        return newInst;
    }
}