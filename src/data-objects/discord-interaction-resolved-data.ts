/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DiscordGuildMember } from './discord-guild-member';
import { DiscordMessage } from './discord-message';
import { DiscordRole } from './discord-role';
import { DiscordUser } from './discord-user';

interface UserMap {
    [key: string]: DiscordUser;
}

interface MemberMap {
    [key: string]: DiscordGuildMember;
}

interface RoleMap {
    [key: string]: DiscordRole;
}

// interface ChannelMap {
//     [key: string]: DiscordCh;
// }

interface MessageMap {
    [key: string]: DiscordMessage;
}

export default class DiscordInteractionResolvedData {

    /**
     * Map of Snowflakes to user objects
     */
    public users?: UserMap;

    /**
     * Map of Snowflakes to partial member objects
     */
    public members?: MemberMap;

    /**
     * Map of Snowflakes to role objects
     */
    public roles?: RoleMap;
    //public channels?  ;                   // Map of Snowflakes to partial channel objects

    /**
     * Map of Snowflakes to partial messages objects
     */
    public messages?: MessageMap;

    static fromJson(json: any): DiscordInteractionResolvedData {
        const newInst = new DiscordInteractionResolvedData();
        newInst.users = json.users;
        newInst.members = json.members;
        newInst.roles = json.roles;
        newInst.messages = json.messages;
        return newInst;
    }
}