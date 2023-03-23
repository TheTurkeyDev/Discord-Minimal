/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import WebSocket, { OPEN } from 'ws';
import events from 'events';
import { APIVersion, getGatewayBot } from './api/discord-api';
import { WebSocketData } from './api/websocket-data';
import {
    DiscordApplicationCommandPermissions,
    DiscordChannel,
    DiscordChannelPinsUpdate,
    DiscordGatewayBotInfo,
    DiscordGuildMember,
    DiscordGuildMemberRemove,
    DiscordGuildMembersChunk,
    DiscordGuildMemberUpdate,
    DiscordGuildRoleDelete,
    DiscordGuildRoleUpsert,
    DiscordMessageReactionRemove,
    DiscordMessageReactionRemoveAll,
    DiscordMessageReactionRemoveEmoji,
    DiscordPresence,
    DiscordStageInstance,
    DiscordThreadListSync,
    DiscordUser,
} from './data-objects';
import { GatewayPayload, HeartBeatPayload, IdentifyPayload, ResumePayload } from './payloads';
import {
    DiscordGuild,
    DiscordInteraction,
    DiscordMessage,
    DiscordMessageDelete,
    DiscordMessageDeleteBulk,
    DiscordMessageReactionAdd,
    DiscordReady,
} from '.';
import { DiscordMessageUpdate } from './data-objects/discord-message-update';
import { DiscordThreadMember } from './data-objects/discord-thread-member';

type MessageEvent = {
    data: any;
    type: string;
    target: WebSocket;
};

type CloseEvent = {
    wasClean: boolean;
    code: number;
    reason: string;
    target: WebSocket;
};
/**
 * Main client for interactiong with the Discord API
 * @interface DiscordMinimal
 */
export declare interface DiscordMinimal {
    /**
     * @event DiscordMinimal#debug
     */
    on(event: 'debug', listener: (message: string) => void): this;
    /**
     * The ready event is dispatched when a client has completed the initial handshake with the gateway (for new sessions)
     * @event DiscordMinimal#ready
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#ready}
     */
    on(event: 'ready', listener: (ready: DiscordReady) => void): this;
    /**
     * The resumed event is dispatched when a client has sent a resume payload to the gateway (for resuming existing sessions).
     * @event DiscordMinimal#resumed
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#resumed}
     */
    on(event: 'resumed', listener: () => void): this;
    /**
     * @event DiscordMinimal#eventRaw
     */
    on(event: 'eventRaw', listener: (eventId: string, message: string) => void): this;
    /**
     * Sent when a message is created
     * @event DiscordMinimal#messageCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-create}
     */
    on(event: 'messageCreate', listener: (message: DiscordMessage) => void): this;
    /**
     * Sent when a message is updated. The inner payload is a message object with the same extra fields as MESSAGE_CREATE.
     * @event DiscordMinimal#messageUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-update}
     */
    on(event: 'messageUpdate', listener: (message: DiscordMessageUpdate) => void): this;
    /**
     * Sent when a message is deleted.
     * @event DiscordMinimal#messageDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-delete}
     */
    on(event: 'messageDelete', listener: (message: DiscordMessageDelete) => void): this;
    /**
     * Sent when multiple messages are deleted at once.
     * @event DiscordMinimal#messageDeleteBulk
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-delete-bulk}
     */
    on(event: 'messageDeleteBulk', listener: (messages: DiscordMessageDeleteBulk) => void): this;
    /**
     * Sent when a user adds a reaction to a message.
     * @event DiscordMinimal#messageReactionAdd
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-reaction-add}
     */
    on(
        event: 'messageReactionAdd',
        listener: (messageReaction: DiscordMessageReactionAdd) => void,
    ): this;
    /**
     * Sent when a user removes a reaction from a message.
     * @event DiscordMinimal#messageReactionRemove
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove}
     */
    on(
        event: 'messageReactionRemove',
        listener: (messageReaction: DiscordMessageReactionRemove) => void,
    ): this;
    /**
     * Sent when a user explicitly removes all reactions from a message.
     * @event DiscordMinimal#messageReactionRemoveAll
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-all}
     */
    on(
        event: 'messageReactionRemoveAll',
        listener: (messageReaction: DiscordMessageReactionRemoveAll) => void,
    ): this;
    /**
     * Sent when a bot removes all instances of a given emoji from the reactions of a message.
     * @event DiscordMinimal#messageReactionRemoveEmoji
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#message-reaction-remove-emoji}
     */
    on(
        event: 'messageReactionRemoveEmoji',
        listener: (msgReaction: DiscordMessageReactionRemoveEmoji) => void,
    ): this;
    /**
     * Sent when a user uses an Application Command or Message Component. Inner payload is an Interaction.
     * @event DiscordMinimal#interactionCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#interaction-create}
     */
    on(event: 'interactionCreate', listener: (interaction: DiscordInteraction) => void): this;
    /**
     * Idk how to describe this just read the documentation
     * @event DiscordMinimal#guildCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-create}
     */
    on(event: 'guildCreate', listener: (interaction: DiscordGuild) => void): this;
    /**
     * Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. The inner payload is an unavailable guild object. If the unavailable field is not set, the user was removed from the guild.
     * @event DiscordMinimal#guildDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-delete}
     */
    on(event: 'guildDelete', listener: (interaction: DiscordGuild) => void): this;
    /**
     * Sent when a guild is updated. The inner payload is a guild object.
     * @event DiscordMinimal#guildUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-update}
     */
    on(event: 'guildUpdate', listener: (interaction: DiscordGuild) => void): this;
    /**
     * Sent when a new user joins a guild. The inner payload is a guild member object with an extra guild_id key
     * @event DiscordMinimal#guildMemberAdd
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-member-add}
     */
    on(event: 'guildMemberAdd', listener: (member: DiscordGuildMember) => void): this;
    /**
     * Sent in response to Guild Request Members. You can use the chunk_index and chunk_count to calculate how many chunks are left for your request.
     * @event DiscordMinimal#guildMemberChunk
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-members-chunk}
     */
    on(event: 'guildMembersChunk', listener: (member: DiscordGuildMembersChunk) => void): this;
    /**
     * Sent when a user is removed from a guild (leave/kick/ban).
     * @event DiscordMinimal#guildMemberRemove
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-member-remove}
     */
    on(event: 'guildMemberRemove', listener: (member: DiscordGuildMemberRemove) => void): this;
    /**
     * Sent when a guild member is updated. This will also fire when the user object of a guild member changes.
     * @event DiscordMinimal#guildMemberUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-member-update}
     */
    on(event: 'guildMemberUpdate', listener: (member: DiscordGuildMemberUpdate) => void): this;
    /**
     * Sent when a guild role is created.
     * @event DiscordMinimal#guildRoleCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-role-create}
     */
    on(event: 'guildRoleCreate', listener: (upsert: DiscordGuildRoleUpsert) => void): this;
    /**
     * Sent when a guild role is updated.
     * @event DiscordMinimal#guildRoleUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-role-update}
     */
    on(event: 'guildRoleUpdate', listener: (upsert: DiscordGuildRoleUpsert) => void): this;
    /**
     * Sent when a guild role is deleted.
     * @event DiscordMinimal#guildRoleDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#guild-role-delete}
     */
    on(event: 'guildRoleDelete', listener: (upsert: DiscordGuildRoleDelete) => void): this;
    /**
     * Sent when a new guild channel is created, relevant to the current user. The inner payload is a channel object.
     * @event DiscordMinimal#channelCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#channel-create}
     */
    on(event: 'channelCreate', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when a channel is updated. The inner payload is a channel object.
     * @event DiscordMinimal#channelUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#channel-update}
     */
    on(event: 'channelUpdate', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when a channel relevant to the current user is deleted. The inner payload is a channel object.
     * @event DiscordMinimal#channelDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#channel-delete}
     */
    on(event: 'channelDelete', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted.
     * @event DiscordMinimal#channelPinsUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#channel-pins-update}
     */
    on(
        event: 'channelPinsUpdate',
        listener: (channelPinsUpdate: DiscordChannelPinsUpdate) => void,
    ): this;
    /**
     * APPLICATION_COMMAND_PERMISSIONS_UPDATE event, sent when an application command's permissions are updated. The inner payload is an application command permissions object.
     * @event DiscordMinimal#applicationCommandPermissionsUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#application-command-permissions-update}
     */
    on(
        event: 'applicationCommandPermissionsUpdate',
        listener: (permissionsUpdate: DiscordApplicationCommandPermissions) => void,
    ): this;
    /**
     * Sent when a Stage instance is created (i.e. the Stage is now "live"). Inner payload is a Stage instance
     * @event DiscordMinimal#stageInstanceCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#stage-instance-create}
     */
    on(event: 'stageInstanceCreate', listener: (stageInstance: DiscordStageInstance) => void): this;
    /**
     * Sent when a Stage instance has been deleted (i.e. the Stage has been closed). Inner payload is a Stage instance
     * @event DiscordMinimal#stageInstanceDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#stage-instance-delete}
     */
    on(event: 'stageInstanceDelete', listener: (stageInstance: DiscordStageInstance) => void): this;
    /**
     * Sent when a Stage instance has been updated. Inner payload is a Stage instance
     * @event DiscordMinimal#stageInstanceUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#stage-instance-update}
     */
    on(event: 'stageInstanceUpdate', listener: (stageInstance: DiscordStageInstance) => void): this;
    /**
     * Sent when the current user gains access to a channel.
     * @event DiscordMinimal#threadListSync
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#thread-list-sync}
     */
    on(event: 'threadListSync', listener: (threadListSync: DiscordThreadListSync) => void): this;
    /**
     * Sent when a thread is created, relevant to the current user, or when the current user is added to a thread. The inner payload is a channel object.
     * @event DiscordMinimal#threadCreate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#thread-create}
     */
    on(event: 'threadCreate', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when a thread relevant to the current user is deleted. The inner payload is a subset of the channel object, containing just the id, guild_id, parent_id, and type fields.
     * @event DiscordMinimal#threadDelete
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#thread-delete}
     */
    on(event: 'threadDelete', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when a thread is created, relevant to the current user, or when the current user is added to a thread. The inner payload is a channel object.
     * @event DiscordMinimal#threadUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#thread-update}
     */
    on(event: 'threadUpdate', listener: (channel: DiscordChannel) => void): this;
    /**
     * Sent when the thread member object for the current user is updated. The inner payload is a thread member object with an extra guild_id field
     * @event DiscordMinimal#threadMemberUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#thread-member-update}
     */
    on(event: 'threadMemberUpdate', listener: (threadMember: DiscordThreadMember) => void): this;
    /**
     * Sent when properties about the user change. Inner payload is a user object.
     * @event DiscordMinimal#userUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#user-update}
     */
    on(event: 'userUpdate', listener: (user: DiscordUser) => void): this;
    /**
     * Sent when a user's presence or info, such as name or avatar, is updated.
     * @event DiscordMinimal#presenceUpdate
     * @see {@link https://discord.com/developers/docs/topics/gateway-events#presence-update}
     */
    on(event: 'presenceUpdate', listener: (presence: DiscordPresence) => void): this;

    on(event: string, listener: () => void): this;
}

type Events = {
    [type: string]: {
        eventId: string;
        dataMap: (data: any) => any;
    };
};
const EVENTS_MAP: Events = {};
function addEvent(type: string, eventId: string, dataMap: (data: any) => any) {
    EVENTS_MAP[type] = { eventId, dataMap };
}

addEvent('MESSAGE_CREATE', 'messageCreate', (d) => DiscordMessage.fromJson(d));
addEvent('MESSAGE_UPDATE', 'messageUpdate', (d) => DiscordMessageUpdate.fromJson(d));
addEvent('MESSAGE_DELETE', 'messageDelete', (d) => DiscordMessageDelete.fromJson(d));
addEvent('MESSAGE_DELETE_BULK', 'messageDeleteBulk', (d) => DiscordMessageDeleteBulk.fromJson(d));
addEvent('MESSAGE_REACTION_ADD', 'messageReactionAdd', (d) =>
    DiscordMessageReactionAdd.fromJson(d),
);
addEvent('MESSAGE_REACTION_REMOVE', 'messageReactionRemove', (d) =>
    DiscordMessageReactionRemove.fromJson(d),
);
addEvent('MESSAGE_REACTION_REMOVE_ALL', 'messageReactionRemoveAll', (d) =>
    DiscordMessageReactionRemoveAll.fromJson(d),
);
addEvent('MESSAGE_REACTION_REMOVE_EMOJI', 'messageReactionRemoveEmoji', (d) =>
    DiscordMessageReactionRemoveEmoji.fromJson(d),
);
addEvent('INTERACTION_CREATE', 'interactionCreate', (d) => DiscordInteraction.fromJson(d));
addEvent('GUILD_CREATE', 'guildCreate', (d) => DiscordGuild.fromJson(d));
addEvent('GUILD_DELETE', 'guildDelete', (d) => DiscordGuild.fromJson(d));
addEvent('GUILD_UPDATE', 'guildUpdate', (d) => DiscordGuild.fromJson(d));
addEvent('GUILD_MEMBER_ADD', 'guildMemberAdd', (d) => DiscordGuildMember.fromJson(d));
addEvent('GUILD_MEMBER_REMOVE', 'guildMemberRemove', (d) => DiscordGuildMemberRemove.fromJson(d));
addEvent('GUILD_MEMBER_UPDATE', 'guildMemberUpdate', (d) => DiscordGuildMemberUpdate.fromJson(d));
addEvent('GUILD_MEMBERS_CHUNK', 'guildMembersChunk', (d) => DiscordGuildMembersChunk.fromJson(d));
addEvent('GUILD_ROLE_CREATE', 'guildRoleCreate', (d) => DiscordGuildRoleUpsert.fromJson(d));
addEvent('GUILD_ROLE_UPDATE', 'guildRoleUpdate', (d) => DiscordGuildRoleUpsert.fromJson(d));
addEvent('GUILD_ROLE_DELETE', 'guildRoleDelete', (d) => DiscordGuildRoleDelete.fromJson(d));
addEvent('CHANNEL_CREATE', 'channelCreate', (d) => DiscordChannel.fromJson(d));
addEvent('CHANNEL_UPDATE', 'channelUpdate', (d) => DiscordChannel.fromJson(d));
addEvent('CHANNEL_DELETE', 'channelDelete', (d) => DiscordChannel.fromJson(d));
addEvent('CHANNEL_PINS_UPDATE', 'channelPinsUpdate', (d) => DiscordChannelPinsUpdate.fromJson(d));
addEvent('APPLICATION_COMMAND_PERMISSIONS_UPDATE', 'applicationCommandPermissionsUpdate', (d) =>
    DiscordApplicationCommandPermissions.fromJson(d),
);
addEvent('STAGE_INSTANCE_CREATE', 'stageInstanceCreate', (d) => DiscordStageInstance.fromJson(d));
addEvent('STAGE_INSTANCE_DELETE', 'stageInstanceDelete', (d) => DiscordStageInstance.fromJson(d));
addEvent('STAGE_INSTANCE_UPDATE', 'stageInstanceUpdate', (d) => DiscordStageInstance.fromJson(d));
addEvent('THREAD_LIST_SYNC', 'threadListSync', (d) => DiscordThreadListSync.fromJson(d));
addEvent('THREAD_CREATE', 'threadCreate', (d) => DiscordChannel.fromJson(d));
addEvent('THREAD_DELETE', 'threadDelete', (d) => DiscordChannel.fromJson(d));
addEvent('THREAD_UPDATE', 'threadUpdate', (d) => DiscordChannel.fromJson(d));
addEvent('THREAD_MEMBER_UPDATE', 'threadMemberUpdate', (d) => DiscordThreadMember.fromJson(d));
addEvent('USER_UPDATE', 'userUpdate', (d) => DiscordUser.fromJson(d));
addEvent('PRESENCE_UPDATE', 'presenceUpdate', (d) => DiscordPresence.fromJson(d));

export class DiscordMinimal extends events.EventEmitter {
    private websocket: WebSocketData[] = [];
    private heartbeats: {
        timer?: NodeJS.Timer
        lastSend: Date,
        lastReceive: Date,
    }[] = [];
    // This should probably be done better...
    // Probably switch to some sort of Request Builder
    public static token?: string;

    private intents: number;
    private shards = 1;

    constructor(intents: number[]) {
        super();
        this.intents = intents.reduce((sum, a) => sum + a, 0);
    }

    public async login(token: string) {
        DiscordMinimal.token = token;

        const gatewayInfo = await getGatewayBot().catch((e) => {
            console.log(e);
            return new DiscordGatewayBotInfo({});
        });

        gatewayInfo.url;
        this.shards = gatewayInfo.shards;

        const interval = setInterval(() => {
            const startIndex = this.websocket.length;
            const max = Math.min(
                gatewayInfo.session_start_limit.max_concurrency,
                this.shards - startIndex,
            );
            for (let i = 0; i < max; i++) this.initGatewaySocket(gatewayInfo.url, startIndex + i);

            if (this.websocket.length === this.shards) clearInterval(interval);
        }, 7000);
    }

    private initGatewaySocket(gatewayUrl: string, shardId: number) {
        const ws = new WebSocket(`${gatewayUrl}/?v=${APIVersion}&encoding=json`);

        const wsd = new WebSocketData(ws, shardId);
        this.websocket[shardId] = wsd;

        ws.addEventListener('message', (event: MessageEvent) =>
            this.onMessage(wsd, event, shardId),
        );
        ws.addEventListener('close', (event: CloseEvent) => this.onClose(event, shardId));
        ws.addEventListener('open', (event: any) => this.onOpen(event, shardId));
        ws.addEventListener('error', (error: any) => console.error(error));
    }

    private onMessage(wsd: WebSocketData, event: MessageEvent, shardNum: number) {
        const message: GatewayPayload = Object.assign(new GatewayPayload(), JSON.parse(event.data));
        if (message.s) wsd.seq = message.s;

        this.debug(`${this.baseStr('Message')} | Shard: ${shardNum} | OP: ${message.op}`);

        switch (message.op) {
            case 0:
                this.onEvent(message, wsd);
                break;
            case 7:
            case 9:
                if (message.d)
                    this.sendPayload(
                        wsd.ws,
                        new ResumePayload(DiscordMinimal.token ?? '', wsd.session_id, wsd.seq),
                    );
                break;
            case 10:
                this.startHeartbeat(wsd, shardNum, parseInt(message.d.heartbeat_interval));
                if (wsd.resume)
                    this.sendPayload(
                        wsd.ws,
                        new ResumePayload(DiscordMinimal.token ?? '', wsd.session_id, wsd.seq),
                    );
                else
                    this.sendPayload(
                        wsd.ws,
                        new IdentifyPayload(DiscordMinimal.token ?? '', this.intents, [
                            shardNum,
                            this.shards,
                        ]),
                    );
                break;
            case 11:
                this.heartbeats[shardNum].lastReceive = new Date();
                //Heartbeat ACK
                break;
            default:
                console.log('[Discord] Unknown OP Code: ' + message.op);
        }
    }

    private debug(message: string) {
        this.emit('debug', message);
    }

    private onOpen(event: WebSocket.Event, shardId: number) {
        this.debug(`${this.baseStr('Open')} | Shard: ${shardId} | Event type: ${event.type}`);
    }

    private onClose(event: CloseEvent, shardId: number) {
        const code = event.code;

        clearInterval(this.heartbeats[shardId].timer);
        this.heartbeats[shardId].timer = undefined;

        this.debug(
            `${this.baseStr('Close')} | Shard: ${shardId} | Code: ${code} | Reason: ${event.reason}`,
        );

        if (code < 4000) {
            this.initReconnect(shardId);
            return;
        }

        switch (code) {
            case 4000:
            case 4008:
            case 4009:
                this.initReconnect(shardId);
                break;
            default:
                console.log('[DISCORD] Closed: ' + code + ' - ' + event.reason);
                this.initReconnectFull();
                break;
        }
    }

    private initReconnect(shardId: number) {
        const socketData = this.websocket.find((wsd) => wsd.shard === shardId);
        if (socketData) {
            socketData.resume = true;
            socketData.ws.removeAllListeners();
            socketData.ws.close(1002);

            const ws = new WebSocket(`${socketData.resume_url}/?v=${APIVersion}&encoding=json`);
            socketData.ws = ws;
            ws.addEventListener('message', (event: MessageEvent) =>
                this.onMessage(socketData, event, shardId),
            );
            ws.addEventListener('close', (event: CloseEvent) => this.onClose(event, shardId));
            ws.addEventListener('error', (error: any) => console.error(error));
        }
    }

    private initReconnectFull() {
        for (let i = 0; i < this.websocket.length; i++)
            this.websocket[i].ws.removeAllListeners();
        this.websocket = [];
        this.login(DiscordMinimal.token ?? '');
    }

    public getShardWebSocket(shardId: number): WebSocketData | undefined {
        return this.websocket.find(ws => ws.shard === shardId);
    }

    public sendPayload(ws: WebSocket, message: GatewayPayload): void {
        if (ws.readyState === OPEN) ws.send(JSON.stringify(message));
    }

    private onEvent(json: GatewayPayload, wsd: WebSocketData): void {
        const eventId = json.t;

        this.debug(`${this.baseStr('Event received')} | Shard: ${wsd.shard} | ID: ${eventId}`);

        if (!eventId) {
            return;
        }

        this.emit('eventRaw', eventId, JSON.stringify(json.d));

        const event = EVENTS_MAP[eventId];
        if (event) {
            this.emit(event.eventId, event.dataMap(json.d));
        } else if (eventId === 'READY') {
            const ready = new DiscordReady(json.d);
            wsd.session_id = ready.session_id;
            wsd.resume_url = ready.resume_gateway_url;
            this.emit('ready', ready);
        } else if (eventId === 'RESUMED') {
            this.emit('resumed');
        }
        // eslint-disable-next-line max-len
        else if (
            [
                'GUILD_JOIN_REQUEST_UPDATE',
                'GUILD_JOIN_REQUEST_DELETE',
                'GUILD_APPLICATION_COMMAND_INDEX_UPDATE',
                'GIFT_CODE_UPDATE',
                'GUILD_SOUNDBOARD_SOUND_CREATE',
                'THREAD_MEMBERS_UPDATE' // Just a list of thread members?
            ].includes(eventId)
        ) {
            //TODO: I've seen these event id's but no idea what their payload is... Can't find docs on them
        } else {
            console.log('UNKNOWN EVENT!', eventId);
        }
    }

    private startHeartbeat(wsd: WebSocketData, shardNum: number, heartbeatDelay: number) {
        if (!this.heartbeats[shardNum]) {
            this.heartbeats[shardNum] = {
                timer: undefined,
                lastSend: new Date(0),
                lastReceive: new Date(0),
            };
        }

        const hBData = this.heartbeats[shardNum];

        if (hBData.timer)
            clearInterval(hBData.timer);

        hBData.timer = setInterval(() => {
            hBData.lastSend = new Date();
            this.sendPayload(wsd.ws, new HeartBeatPayload(wsd.seq));
            this.debug(
                `${this.baseStr('Heartbeat')} | Shard: ${shardNum} | Delay: ${heartbeatDelay}`,
            );
        }, heartbeatDelay);
    }

    private baseStr(str: string): string {
        return str + ' '.repeat(20 - str.length);
    }

    public getHeartBeatData() {
        return this.heartbeats.map((hbd, i) => ({
            shardId: i,
            lastReceive: hbd.lastReceive,
            lastSend: hbd.lastSend,
            timerSet: !!hbd.timer
        }));
    }
}

export default DiscordMinimal;
