export enum DiscordInteractionCallbackType {
    PONG = 1,                                       // ACK a Ping
    CHANNEL_MESSAGE_WITH_SOURCE = 4,                // A button object
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,       // ACK an interaction and edit a response later, the user sees a loading state
    DEFERRED_UPDATE_MESSAGE = 6,                    // For components, ACK an interaction and edit the original message later; the user does not see a loading state
    UPDATE_MESSAGE = 7,                             // For components, edit the message the component was attached to
}