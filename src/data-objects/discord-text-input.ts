import { DiscordTextInputStyle } from '../custom-types';
import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';

export class DiscordTextInput extends DiscordComponent {

    /**
     * A developer-defined identifier for the input, max 100 characters
     */
    public custom_id: string;

    /**
     * The Text Input Style
     */
    public style: DiscordTextInputStyle;

    /**
     * The label for this component, max 45 characters
     */
    public label: string;

    /**
     * The minimum input length for a text input, min 0, max 4000
     */
    public min_length?: number;

    /**
     * The maximum input length for a text input, min 1, max 4000
     */
    public max_length?: number;

    /**
     * Whether this component is required to be filled, default true
     */
    public required?: boolean;

    /**
     * A pre-filled value for this component, max 4000 characters
     */
    public value?: string;

    /**
     * Custom placeholder text if the input is empty, max 100 characters
     */
    public placeholder?: string;

    constructor(custom_id: string, style: DiscordTextInputStyle, label: string) {
        super(DiscordComponentType.TEXT_INPUT);
        this.custom_id = custom_id;
        this.style = style;
        this.label = label;
    }

    static fromJson(json: any): DiscordComponent {
        const btn = new DiscordTextInput(json.custom_id, json.style, json.label);
        btn.min_length = json.min_length;
        btn.max_length = json.max_length;
        btn.required = json.required;
        btn.value = json.value;
        btn.placeholder = json.placeholder;
        return btn;
    }
}