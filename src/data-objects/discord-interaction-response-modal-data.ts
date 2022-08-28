import DiscordComponent from './discord-component';

export default class DiscordInteractionResponseModalData {

    /**
     * A developer-defined identifier for the component, max 100 characters
     */
    public custom_id: string;

    /**
     * The title of the popup modal, max 45 characters
     */
    public title: string;

    /**
     * Between 1 and 5(inclusive) components that make up the modal
     */
    public components: DiscordComponent[] = [];

    constructor(custom_id: string, title: string) {
        this.custom_id = custom_id;
        this.title = title;
    }

    public addComponents(...components: DiscordComponent[]): DiscordInteractionResponseModalData {
        this.components = components;
        return this;
    }
}