/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export class DiscordApplicationCommandOptionChoiceStructure
{
    public name: string;                // 1-100 character choice name
    public value: string | number;      // Value of the choice, up to 100 characters if string

    constructor(name: string, value: string | number)
    {
        this.name = name;
        this.value = value;
    }

    static fromJson(json: any): DiscordApplicationCommandOptionChoiceStructure
    {
        const newInst = new DiscordApplicationCommandOptionChoiceStructure(json.name, json.value);
        return newInst;
    }
}