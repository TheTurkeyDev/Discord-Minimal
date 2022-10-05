import { DiscordComponentType } from '../custom-types/discord-component-types';
import DiscordComponent from './discord-component';

export class DiscordMessageActionRow extends DiscordComponent {

    /**
     * A list of child components
     */
    public components: DiscordComponent[] = [];

    constructor() {
        super(DiscordComponentType.ACTION_ROW);
    }

    public addComponents(...components: DiscordComponent[]): DiscordMessageActionRow {
        this.components = components;
        return this;
    }

    static fromJson(json: any): DiscordComponent {
        return new DiscordMessageActionRow().addComponents(...(json.components?.map(DiscordComponent.fromJson) ?? []));
    }
}