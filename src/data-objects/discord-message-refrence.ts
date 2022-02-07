import { Snowflake } from '..';

export default class DiscordMessageRefrence {
    public message_id?: Snowflake;                  // Id of the originating message
    public channel_id?: Snowflake;	                // Id of the originating message's channel
    public guild_id?: Snowflake;                    // Id of the originating message's guild
    public fail_if_not_exists?: boolean;            // When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
}