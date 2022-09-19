import { DiscordButtonStyle } from '../custom-types/discord-button-styles';
import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';
import { DiscordEmoji } from './discord-emoji';


export class DiscordMessageButton extends DiscordComponent {

    /**
     * A developer-defined identifier for the component, max 100 characters
     */
    public custom_id?: string;

    /**
     * Whether the component is disabled, default false
     */
    public disabled?: boolean = false;

    /**
     * One of button styles
     */
    public style: DiscordButtonStyle;

    /**
     * Text that appears on the button, max 80 characters
     */
    public label?: string;

    /**
     * Partial emoji name, id, and animated
     */
    public emoji?: DiscordEmoji;

    /**
     * A url for link - style buttons
     */
    public url?: string;

    constructor(style: DiscordButtonStyle) {
        super(DiscordComponentType.BUTTON);
        this.style = style;
    }

    public setCustomId(id: string): DiscordMessageButton {
        this.custom_id = id;
        return this;
    }

    public setLabel(label: string): DiscordMessageButton {
        this.label = label;
        return this;
    }

    static fromJson(json: any): DiscordComponent {
        const btn = new DiscordMessageButton(json.style);
        btn.custom_id = json.custom_id;
        btn.disabled = json.disabled;
        btn.label = json.label;
        btn.emoji = json.emoji && DiscordEmoji.fromJson(json.emoji);
        btn.url = json.url;
        return btn;
    }
}