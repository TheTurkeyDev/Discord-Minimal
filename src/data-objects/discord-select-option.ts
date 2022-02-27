/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DiscordEmoji } from './discord-emoji';

export class DiscordSelectOption {
    public label: string;                   // The user-facing name of the option, max 100 characters
    public value: string;                   // The dev-define value of the option, max 100 characters
    public description?: string;            // An additional description of the option, max 100 characters
    public emoji?: DiscordEmoji;            // Partial emoji object	id, name, and animated
    public default?: boolean;	            // Will render this option as selected by default

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }

    static fromJson(json: any): DiscordSelectOption {
        const newInst = new DiscordSelectOption(json.label, json.value);
        newInst.description = json.description;
        newInst.emoji = json.emoji && DiscordEmoji.fromJson(json.emoji);
        newInst.default = json.default;
        return newInst;
    }

    public setDescription(description: string): DiscordSelectOption {
        this.description = description;
        return this;
    }

    public setEmoji(emoji: DiscordEmoji): DiscordSelectOption {
        this.emoji = emoji;
        return this;
    }

    public setDefault(def = true): DiscordSelectOption {
        this.default = def;
        return this;
    }
}