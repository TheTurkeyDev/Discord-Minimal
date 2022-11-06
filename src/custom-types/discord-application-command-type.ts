/**
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
 */
export enum DiscordApplicationCommandType {
    /**
     * Slash commands; a text-based command that shows up when a user types /
     */
    CHAT_INPUT = 1,
    /**
     * A UI-based command that shows up when you right click or tap on a user
     */
    USER = 2,
    /**
     * A UI-based command that shows up when you right click or tap on a message
     */
    MESSAGE = 3,
}
