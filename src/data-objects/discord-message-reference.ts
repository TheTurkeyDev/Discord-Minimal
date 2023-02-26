import { Snowflake } from '../custom-types';

export class DiscordMessageReference {

    /**
     * Id of the originating message
     */
    public message_id?: Snowflake;

    /**
     * Id of the originating message's channel
     */
    public channel_id?: Snowflake;

    /**
     * Id of the originating message's guild
     */
    public guild_id?: Snowflake;

    /**
     * When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true
     */
    public fail_if_not_exists?: boolean;
}