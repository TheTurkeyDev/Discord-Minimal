/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DiscordComponentType } from '../custom-types/discord-component-types';
import { Snowflake } from '../custom-types/snowflake';
import DiscordInteractionData from './discord-interaction-data';
import DiscordUser from './discord-user';
import * as DiscordAPI from '../api/discord-api';
import { DiscordInteractionCallbackType } from '../custom-types/discord-interaction-callback-type';
import DiscordInteractionResponseData from './discord-interaction-response-data';
import DiscordGuildMember from './discord-guild-memeber';
import { DiscordMessage, DiscordMessageCreate } from '..';
import { DiscordInteractionType } from '../custom-types/discord-interaction-type';

export default class DiscordInteraction {

    public id!: Snowflake;                          // Id of the interaction
    public application_id!: Snowflake;	            // Id of the application this interaction is for
    public type!: DiscordInteractionType;	        // Interaction type the type of interaction
    public data?: DiscordInteractionData;           // The command data payload
    public guild_id?: Snowflake;	                // The guild it was sent from
    public channel_id?: Snowflake;	                // The channel it was sent from
    public member?: DiscordGuildMember;             // Guild member data for the invoking user, including permissions
    public user?: DiscordUser;                      // User object for the invoking user, if invoked in a DM
    public token!: string;                          // A continuation token for responding to the interaction
    public version?: number;	                    // Read-only property, always 1
    public message?: DiscordMessage;                // For components, the message they were attached to

    constructor(id: Snowflake, application_id: Snowflake, type: DiscordInteractionType, token: string) {
        this.id = id;
        this.application_id = application_id;
        this.type = type;
        this.token = token;
    }

    static fromJson(json: any): DiscordInteraction {
        const newInst = new DiscordInteraction(json.id, json.application_id, json.type, json.token);
        newInst.data = json.data && DiscordInteractionData.fromJson(json.data);
        newInst.guild_id = json.guild_id;
        newInst.channel_id = json.channel_id;
        newInst.member = json.member && DiscordGuildMember.fromJson(json.member);
        newInst.user = json.user && DiscordUser.fromJson(json.user);
        newInst.version = json.version;
        newInst.message = json.message && DiscordMessage.fromJson(json.message);
        return newInst;
    }

    public isButton(): boolean {
        return this.data?.component_type == DiscordComponentType.BUTTON;
    }

    public isAppCommand(): boolean {
        return this.type == DiscordInteractionType.APPLICATION_COMMAND;
    }

    public update(data: DiscordInteractionResponseData): Promise<void> {
        return DiscordAPI.interactionCallback(this.id, this.token, {
            type: DiscordInteractionCallbackType.UPDATE_MESSAGE,
            data
        });
    }

    public respond(data: DiscordInteractionResponseData): Promise<void> {
        return DiscordAPI.interactionCallback(this.id, this.token, {
            type: DiscordInteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
            data
        });
    }

    public sendMessageInChannel(message: DiscordMessageCreate): Promise<DiscordMessage> {
        return DiscordAPI.createMessage(this.channel_id ?? -1, message);
    }
}