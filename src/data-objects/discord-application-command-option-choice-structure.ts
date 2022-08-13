/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class DiscordApplicationCommandOptionChoiceStructure {

    /**
     * 1-100 character choice name
     */
    public name: string;

    /**
     * Value of the choice, up to 100 characters if string
     */
    public value: string | number;

    constructor(name: string, value: string | number) {
        this.name = name;
        this.value = value;
    }

    static fromJson(json: any): DiscordApplicationCommandOptionChoiceStructure {
        const newInst = new DiscordApplicationCommandOptionChoiceStructure(json.name, json.value);
        return newInst;
    }
}