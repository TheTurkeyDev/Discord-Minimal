import { Snowflake } from '../custom-types/snowflake';
import { DiscordUser } from './discord-user';

export class DiscordGuildJoinRequest {
    /**
     * The ID of the join request
     */
    public id: Snowflake;

    /**
     * The ID of the join request
     */
    public join_request_id: Snowflake;

    /**
     * When the join request was created
     */
    public created_at: string;

    /**
     * The status of the join request
     */
    public application_status: string;

    /**
     * The ID of the guild this join request is for
     */
    public guild_id: Snowflake;

    // form_responses? 1	?array[member verification form field object]	Responses to the guild's member verification questions

    /**
     * When the request was acknowledged by the user
     */
    public last_seen: string;

    /**
     * A snowflake representing when the join request was actioned
     */
    public actioned_at?: Snowflake;

    /**
     * Partial user object	
     * The moderator who actioned the join request
     */
    public actioned_by_user?: DiscordUser;

    /**
     * Why the join request was rejected
     */
    public rejection_reason?: string;

    /**
     * The ID of the user who created this join request
     */
    public user_id: Snowflake;

    /**
     * Partial user object	
     * The user who created this join request
     */
    public user?: DiscordUser;

    /**
     * The ID of a channel where an interview regarding this join request may be conducted
     */
    public interview_channel_id?: Snowflake;


    constructor(
        id: Snowflake,
        join_request_id: Snowflake,
        created_at: string,
        application_status: string,
        guild_id: Snowflake,
        last_seen: string,
        user_id: Snowflake
    ) {
        this.id = id;
        this.join_request_id = join_request_id;
        this.created_at = created_at;
        this.application_status = application_status;
        this.guild_id = guild_id;
        this.last_seen = last_seen;
        this.user_id = user_id;
    }

    static fromJson(json: any): DiscordGuildJoinRequest {
        const newInst = new DiscordGuildJoinRequest(
            json.id,
            json.join_request_id,
            json.created_at,
            json.application_status,
            json.guild_id,
            json.last_seen,
            json.user_id
        );
        newInst.actioned_at = json.actioned_at;
        newInst.actioned_by_user = json.actioned_by_user && DiscordUser.fromJson(json.actioned_by_user);
        newInst.rejection_reason = json.rejection_reason;
        newInst.user = json.user && DiscordUser.fromJson(json.user);
        newInst.interview_channel_id = json.interview_channel_id;
        return newInst;
    }
}