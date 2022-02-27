import { DiscordComponentType } from '..';
import DiscordComponent from './discord-component';

export class DiscordMessageActionRow extends DiscordComponent
{
    public components: DiscordComponent[] = [];            // A list of child components

    constructor()
    {
        super();
        super.type = DiscordComponentType.ACTION_ROW;
    }

    public addComponents(...components: DiscordComponent[]): DiscordMessageActionRow
    {
        this.components = components;
        return this;
    }
}