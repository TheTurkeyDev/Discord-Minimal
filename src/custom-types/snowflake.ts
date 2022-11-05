/**
 * @see {@link https://discord.com/developers/docs/reference#snowflakes}
 * A {@link https://developer.twitter.com/en/docs/twitter-ids Twitter snowflake},
 * except the epoch is 2015-01-01T00:00:00.000Z.
 *
 * If we have a snowflake '266241948824764416' we can represent it as binary:
 * ```
 * 64                                          22     17     12          0
 *  000000111011000111100001101001000101000000  00001  00000  000000000000
 *  number of milliseconds since Discord epoch  worker  pid    increment
 * ```
 * @typedef {string} Snowflake
 */
export declare type Snowflake = string;
