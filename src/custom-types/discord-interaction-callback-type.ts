export enum DiscordInteractionCallbackType {
    /**
     * ACK a Ping
     */
    PONG = 1,
    /**
     * A button object
     */
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    /**
     * ACK an interaction and edit a response later, the user sees a loading state
     */
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    /**
     * For components, ACK an interaction and edit the original message later; the user does not see a loading state
     */
    DEFERRED_UPDATE_MESSAGE = 6,
    /**
     * For components, edit the message the component was attached to
     */
    UPDATE_MESSAGE = 7,
}