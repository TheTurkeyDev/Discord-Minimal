import { DiscordButtonStyle, DiscordComponentType, DiscordEmoji } from '..';
import DiscordComponent from './discord-component';


export class DiscordMessageButton extends DiscordComponent
{
    public custom_id?: string;                              // A developer-defined identifier for the component, max 100 characters
    public disabled?: boolean = false;                      // Whether the component is disabled, default false
    public style?: DiscordButtonStyle;                      // One of button styles
    public label?: string;                                  // Text that appears on the button, max 80 characters
    public emoji?: DiscordEmoji;                            // partial emoji name, id, and animated
    public url?: string;                                    // A url for link - style buttons

    constructor()
    {
        super();
        super.type = DiscordComponentType.BUTTON;
    }

    public setCustomId(id: string): DiscordMessageButton
    {
        this.custom_id = id;
        return this;
    }

    public setLabel(label: string): DiscordMessageButton
    {
        this.label = label;
        return this;
    }

    public setStyle(style: DiscordButtonStyle): DiscordMessageButton
    {
        this.style = style;
        return this;
    }
}