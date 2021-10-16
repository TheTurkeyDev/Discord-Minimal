export default class DiscordEmbedField {
    public name: string;	        // Name of the field
    public value: string;	        // Value of the field
    public inline?: boolean;       // Whether or not this field should display inline

    public constructor(name: string, value: string, inline?: boolean) {
        this.name = name;
        this.value = value;
        this.inline = inline;
    }
}