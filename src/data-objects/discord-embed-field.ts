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

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    static fromJson(json: any) {
        const field = new DiscordEmbedField(json.name, json.value);
        field.inline = json.inline;
        return field;
    }
}