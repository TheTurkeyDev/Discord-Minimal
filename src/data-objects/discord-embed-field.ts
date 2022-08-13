export default class DiscordEmbedField {

    /**
     * Name of the field
     */
    public name: string;

    /**
     * Value of the field
     */
    public value: string;

    /**
     * Whether or not this field should display inline
     */
    public inline?: boolean;

    public constructor(name: string, value: string, inline?: boolean) {
        this.name = name;
        this.value = value;
        this.inline = inline;
    }
}