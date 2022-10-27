import { DiscordComponentType } from '../custom-types/discord-component-types';
import { DiscordMessageActionRow, DiscordMessageButton, DiscordSelectMenu, DiscordTextInput } from '..';
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
            case DiscordComponentType.STRING_SELECT:
            case DiscordComponentType.CHANNEL_SELECT:
            case DiscordComponentType.MENTIONABLE_SELECT:
            case DiscordComponentType.USER_SELECT:
            case DiscordComponentType.ROLE_SELECT:
                return DiscordSelectMenu.fromJson(json);
            case DiscordComponentType.TEXT_INPUT:
                return DiscordTextInput.fromJson(json);
            default:
                return new DiscordComponent(json.type);
        }
    }
}