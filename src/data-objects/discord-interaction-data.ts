/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordComponentType } from '../custom-types/discord-component-types';
import { Snowflake } from '../custom-types/snowflake';
import DiscordApplicationCommandInteractionDataOption from './discord-application-command-interaction-data-option';
import DiscordComponent from './discord-component';
import DiscordInteractionResolvedData from './discord-interaction-resolved-data';

export default class DiscordInteractionData {

    /**
     * The ID of the invoked command
     */
    public id: Snowflake;

    /**
     * The name of the invoked command
     */
    public name: string;

    /**
     * The type of the invoked command
     */
    public type: number;

    /**
     * Converted users + roles + channels
     */
    public resolved?: DiscordInteractionResolvedData;

    /**
     * The params + values from the user
     */
    public options: DiscordApplicationCommandInteractionDataOption[] = [];

    /**
     * The custom_id of the component
     */
    public custom_id?: string;

    /**
     * The type of the component
     */
    public component_type?: DiscordComponentType;

    /**
     * The values the user selected
     */
    public values: string[] = [];

    /**
     * Id the of user or message targeted by a user or message command
     */
    public target_id?: Snowflake;

    /**
     * The values the user selected
     */
    public components: DiscordComponent[] = [];

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
        newInst.components = json.components?.map(DiscordComponent.fromJson);
        return newInst;
    }
}