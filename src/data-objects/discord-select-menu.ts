/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordChannelType } from '../custom-types';
import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';
import { DiscordSelectOption } from './discord-select-option';

export class DiscordSelectMenu extends DiscordComponent {

    /**
     * A developer-defined identifier for the component, max 100 characters
     */
    public custom_id: string;

    /**
     * Whether the component is disabled, default false
     */
    public disabled?: boolean = false;

    /**
     * The choices in the select, max 25
     */
    public options: DiscordSelectOption[] = [];

    /**
    * List of channel types to include in the channel select component (type 8)
    */
    public channel_types: DiscordChannelType[] = [];

    /**
     * Custom placeholder text if nothing is selected, max 100 characters
     */
    public placeholder?: string;

    /**
     * The minimum number of items that must be chosen; default 1, min 0, max 25
     */
    public min_values?: number = 1;

    /**
     * The maximum number of items that can be chosen; default 1, max 25
     */
    public max_values?: number = 1;

    constructor(custom_id: string, type: DiscordComponentType = DiscordComponentType.STRING_SELECT) {
        super(type);
        this.custom_id = custom_id;
    }

    public addOptions(...options: DiscordSelectOption[]): DiscordSelectMenu {
        this.options = options;
        return this;
    }

    public setCustomId(id: string): DiscordSelectMenu {
        this.custom_id = id;
        return this;
    }

    static fromJson(json: any): DiscordComponent {
        const btn = new DiscordSelectMenu(json.custom_id);
        btn.disabled = json.disabled;
        btn.options = json.options?.map(DiscordSelectOption.fromJson) ?? [];
        btn.placeholder = json.placeholder;
        btn.min_values = json.min_values;
        btn.max_values = json.max_values;

        return btn;
    }
}