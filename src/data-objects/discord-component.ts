import { DiscordComponentType } from '../custom-types/discord-component-types';
import { DiscordMessageActionRow } from './discord-message-action-row';
import { DiscordMessageButton } from './discord-message-button';
import { DiscordSelectMenu } from './discord-select-menu';
import { DiscordTextInput } from './discord-text-input';

export default class DiscordComponent {
    /**
     * Component type
     */
    public type: DiscordComponentType;

    constructor(type: DiscordComponentType) {
        this.type = type;
    }

    static fromJson(json: any): DiscordComponent {
        switch (json.type) {
            case DiscordComponentType.ACTION_ROW:
                return DiscordMessageActionRow.fromJson(json);
            case DiscordComponentType.BUTTON:
                return DiscordMessageButton.fromJson(json);
            case DiscordComponentType.SELECT_MENU:
                return DiscordSelectMenu.fromJson(json);
            case DiscordComponentType.TEXT_INPUT:
                return DiscordTextInput.fromJson(json);
            default:
                return new DiscordComponent(json.type);
        }
    }
}