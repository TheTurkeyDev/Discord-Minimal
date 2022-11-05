/**
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export enum DiscordApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  /**
   * Any integer between -2^53 and 2^53
   */
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  /**
   * Includes all channel types + categories
   */
  CHANNEL = 7,
  ROLE = 8,
  /**
   * Includes users and roles
   */
  MENTIONABLE = 9,
  /**
   * Any double between -2^53 and 2^53
   */
  NUMBER = 10,
  ATTACHMENT = 11,
}
