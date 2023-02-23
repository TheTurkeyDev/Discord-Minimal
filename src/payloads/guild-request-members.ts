import { Snowflake } from '../custom-types';
import { GatewayPayload } from './gateway-payload';

type GuildRequestMembersBaseStructure = {
    /**
     * ID of the guild to get members for
     */
    guild_id: Snowflake

    /**
     * Used to specify if we want the presences of the matched members
     */
    presences?: boolean

    /**
     * Nonce to identify the Guild Members Chunk response
     */
    nonce?: string
}

export type GuildRequestMembersQueryStructure = GuildRequestMembersBaseStructure & {
    /**
     * String that username starts with, or an empty string to return all members
     */
    query: string

    /**
     * maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members
     * Required when specifying query
     */
    limit: number
}

export type GuildRequestMembersUserIdStructure = GuildRequestMembersBaseStructure & {
    /**
     * used to specify which users you wish to fetch
     * One of query or user_ids must be provided
     */
    user_ids?: Snowflake | Snowflake[]
}

export class GuildRequestMembersPayload extends GatewayPayload {
    constructor(data: GuildRequestMembersQueryStructure | GuildRequestMembersUserIdStructure) {
        super();
        this.op = 8;
        this.d = data;
    }
}