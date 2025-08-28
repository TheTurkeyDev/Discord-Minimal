import { Snowflake } from '../custom-types/snowflake';
import { DiscordGuildJoinRequest } from './discord-guild-join-request';

export class DiscordGuildJoinRequestCreateUpdate {
    /**
     * The id of the guild
     */
    public guild_id: Snowflake;
    
    /**
     * The user who was removed
     */
    public request: DiscordGuildJoinRequest;

    /**
     * 	The status of the join request
     * 
     *      STARTED	    The request is started but not submitted
     *      SUBMITTED	The request has been submitted
     *      REJECTED	The request has been rejected
     *      APPROVED	The request has been approved
     */
    public status: string;

    constructor(guild_id: Snowflake, request: DiscordGuildJoinRequest, status: string) {
        this.guild_id = guild_id;
        this.request = request;
        this.status = status;
    }

    static fromJson(json: any): DiscordGuildJoinRequestCreateUpdate {
        const newInst = new DiscordGuildJoinRequestCreateUpdate(
            json.guild_id, 
            DiscordGuildJoinRequest.fromJson(json.request),
            json.status
        );
        return newInst;
    }
}