import { DiscordButtonStyle } from '../custom-types/discord-button-styles';
import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';

export default class DiscordMessageButton extends DiscordComponent {

    constructor() {
        super();
        super.type = DiscordComponentType.BUTTON;
    }

    public setCustomId(id: string): DiscordMessageButton {
        super.custom_id = id;
        return this;
    }

    public setLabel(label: string): DiscordMessageButton {
        super.label = label;
        return this;
    }

    public setStyle(style: DiscordButtonStyle): DiscordMessageButton {
        super.style = style;
        return this;
    }
}