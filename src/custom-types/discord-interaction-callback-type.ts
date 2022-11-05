/**
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
 */
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
  /**
   * 	Respond to an autocomplete interaction with suggested choices
   */
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
  /**
   * Respond to an interaction with a popup modal
   */
  MODAL = 9,
}
