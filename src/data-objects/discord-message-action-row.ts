import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';

export class DiscordMessageActionRow extends DiscordComponent {

    /**
     * A list of child components
     */
    public components: DiscordComponent[] = [];

    constructor() {
        super();
        super.type = DiscordComponentType.ACTION_ROW;
    }

    public addComponents(...components: DiscordComponent[]): DiscordMessageActionRow {
        this.components = components;
        return this;
    }
}