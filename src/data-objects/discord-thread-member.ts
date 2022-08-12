import { Snowflake } from '../custom-types';

export class DiscordThreadMember {

    /**
     * The id of the thread
     */
    public id?: Snowflake;

    /**
     * The id of the user
     */
    public user_id?: Snowflake;

    /**
     * The time the current user last joined the thread
     */
    public join_timestamp: string;

    /**
     * Any user-thread settings, currently only used for notifications
     */
    public flags: number;

    constructor(join_timestamp: string, flags: number){
        this.join_timestamp =join_timestamp;
        this.flags = flags;
    }

    static fromJson(json: any): DiscordThreadMember {
        const newInst = new DiscordThreadMember(json.join_timestamp, json.flags);
        newInst.id = json.id;
        newInst.user_id = json.user_id;
        return newInst;
    }
}