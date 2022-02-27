/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DiscordComponent from './discord-component';
import { DiscordComponentType, DiscordSelectOption } from '..';

export class DiscordSelectMenu extends DiscordComponent
{

    public custom_id?: string;                      // A developer-defined identifier for the component, max 100 characters
    public disabled?: boolean = false;              // Whether the component is disabled, default false
    public options: DiscordSelectOption[] = [];     // The choices in the select, max 25
    public placeholder?: string;	                // Custom placeholder text if nothing is selected, max 100 characters
    public min_values?: number;	                    // The minimum number of items that must be chosen; default 1, min 0, max 25
    public max_values?: number;	                    // The maximum number of items that can be chosen; default 1, max 25

    constructor()
    {
        super();
        super.type = DiscordComponentType.SELECT_MENU;
    }

    public addOptions(...options: DiscordSelectOption[]): DiscordSelectMenu
    {
        this.options = options;
        return this;
    }

    public setCustomId(id: string): DiscordSelectMenu
    {
        this.custom_id = id;
        return this;
    }
}