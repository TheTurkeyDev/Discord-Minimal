import { DiscordComponentType } from '../custom-types/discord-component-types';
import { Snowflake } from '../custom-types/snowflake';
import DiscordInteractionData from './discord-interaction-data';
import DiscordUser from './discord-user';
import * as DiscordAPI from '../discord-api';
import { DiscordInteractionCallbackType } from '../custom-types/discord-interaction-callback-type';
import DiscordInteractionResponseData from './discord-interaction-response-data';

export default class DiscordInteraction {

    public id!: Snowflake;                      // Id of the interaction
    // public application_id	snowflake	id of the application this interaction is for
    // public type	interaction type the type of interaction
    public data?: DiscordInteractionData;       // The command data payload
    public guild_id?: Snowflake	                //the guild it was sent from
    // public channel_id ? snowflake	the channel it was sent from
    // public member ?** guild member object	guild member data for the invoking user, including permissions
    public user?: DiscordUser;                  // User object for the invoking user, if invoked in a DM
    public token!: string;                      // A continuation token for responding to the interaction
    // public version	integer	read - only property, always 1
    // public message ? message object	for components, the message they were attached to

    public isButton(): boolean {
        return this.data?.component_type == DiscordComponentType.Button;
    }

    public update(data: DiscordInteractionResponseData): void {
        DiscordAPI.interactionCallback(this.id, this.token, {
            type: DiscordInteractionCallbackType.UPDATE_MESSAGE,
            data
        });
    }
}