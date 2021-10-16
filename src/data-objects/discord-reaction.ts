import DiscordEmoji from './discord-emoji';

export default class DiscordReaction {
    public count!: number;              // Times this emoji has been used to react
    public me!: boolean;                // Whether the current user reacted using this emoji
    public emoji!: DiscordEmoji;         // Partial emoji object - emoji information
}