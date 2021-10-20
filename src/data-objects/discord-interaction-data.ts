/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordComponentType } from '../custom-types/discord-component-types';

export default class DiscordInteractionData {
    // public id	snowflake	the ID of the invoked command	Application Command
    // public name	string	the name of the invoked command	Application Command
    // public type integer	the type of the invoked command	Application Command
    // public resolved ? resolved data	converted users + roles + channels	Application Command
    // public options ? array of application command interaction data option	the params + values from the user	Application Command
    public custom_id?: string;	                    // The custom_id of the component	Component
    public component_type?: DiscordComponentType;          // The type of the component	Component
    // public values ? array of select option values	the values the user selected	Component(Select)
    // public target_id ? snowflake	id the of user or message targetted by a user or message command	User Command, Message Command

    constructor(json: any) {
        this.custom_id = json.custom_id;
        this.component_type = json.component_type;
    }
}