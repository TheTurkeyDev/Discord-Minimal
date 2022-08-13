import { DiscordEmoji } from './discord-emoji';

export default class DiscordReaction {

    /**
     * Times this emoji has been used to react
     */
    public count: number;

    /**
     * Whether the current user reacted using this emoji
     */
    public me: boolean;

    /**
     * Partial emoji object - emoji information
     */
    public emoji: DiscordEmoji;

    constructor(count: number, me: boolean, emoji: DiscordEmoji) {
        this.count = count;
        this.me = me;
        this.emoji = emoji;
    }

    static fromJson(json: any){
        const reaction = new DiscordReaction(json.count, json.me, DiscordEmoji.fromJson(json.emoji));
        return reaction;
    }
}