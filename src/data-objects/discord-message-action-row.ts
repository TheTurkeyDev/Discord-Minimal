import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';

export default class DiscordMessageActionRow extends DiscordComponent {

    constructor() {
        super();
        super.type = DiscordComponentType.ACTION_ROW;
    }

    public addComponents(components: DiscordComponent[]): DiscordMessageActionRow {
        super.components = components;
        return this;
    }
}