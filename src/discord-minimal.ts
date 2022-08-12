/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import WebSocket, { OPEN } from 'ws';
import events from 'events';
import { createGlobalApplicationCommand, getGatewayBot } from './api/discord-api';
import { WebSocketData } from './api/websocket-data';
import { DiscordGatewayBotInfo, DiscordGuildMember, DiscordUser } from './data-objects';
import {
    GatewayPayload,
    HeartBeatPayload,
    IdentifyPayload,
    ResumePayload
} from './payloads';
import {
    DiscordApplicationCommand,
    DiscordGuild,
    DiscordInteraction,
    DiscordMessage,
    DiscordMessageDelete,
    DiscordMessageDeleteBulk,
    DiscordMessageReactionAdd,
    DiscordReady
} from '.';
import { DiscordMessageReactionRemove } from './data-objects/discord-message-reaction-remove';
import { DiscordMessageReactionRemoveAll } from './data-objects/discord-message-reaction-remove-all';
import { DiscordMessageReactionRemoveEmoji } from './data-objects/discord-message-reaction-remove-emoji';
import { DiscordGuildMemberRemove } from './data-objects/discord-guild-memeber-remove';
import { DiscordGuildMemberUpdate } from './data-objects/discord-guild-memeber-update';
import { DiscordGuildRoleUpsert } from './data-objects/discord-guild-role-upsert';
import { DiscordGuildRoleDelete } from './data-objects/discord-guild-role-delete';
import { DiscordChannel } from './data-objects/discord-channel';
import { DiscordThreadListSync } from './data-objects/discord-thread-list-sync';
import { DiscordStageInstance } from './data-objects/discord-stage-instance';
import { DiscordChannelPinsUpdate } from './data-objects/discord-channel-pins-update';
import { DiscordApplicationCommandPermissions } from './data-objects/discord-application-command-permissions';

type MessageEvent = {
    data: any;
    type: string;
    target: WebSocket;
}

type CloseEvent = {
    wasClean: boolean;
    code: number;
    reason: string;
    target: WebSocket;
}

export declare interface DiscordMinimal {
    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'ready', listener: (ready: DiscordReady) => void): this;
    on(event: 'resumed', listener: () => void): this;
    on(event: 'messageCreate', listener: (message: DiscordMessage) => void): this;
    on(event: 'messageUpdate', listener: (message: DiscordMessage) => void): this;
    on(event: 'messageDelete', listener: (message: DiscordMessageDelete) => void): this;
    on(event: 'messageDeleteBulk', listener: (messages: DiscordMessageDeleteBulk) => void): this;
    on(event: 'messageReactionAdd', listener: (messageReaction: DiscordMessageReactionAdd) => void): this;
    on(event: 'messageReactionRemove', listener: (messageReaction: DiscordMessageReactionRemove) => void): this;
    on(event: 'messageReactionRemoveAll', listener: (messageReaction: DiscordMessageReactionRemoveAll) => void): this;
    on(event: 'messageReactionRemoveEmoji', listener: (msgReaction: DiscordMessageReactionRemoveEmoji) => void): this;
    on(event: 'interactionCreate', listener: (interaction: DiscordInteraction) => void): this;
    on(event: 'guildCreate', listener: (interaction: DiscordGuild) => void): this;
    on(event: 'guildDelete', listener: (interaction: DiscordGuild) => void): this;
    on(event: 'guildUpdate', listener: (interaction: DiscordGuild) => void): this;
    on(event: 'guildMemberAdd', listener: (memeber: DiscordGuildMember) => void): this;
    on(event: 'guildMemberRemove', listener: (memeber: DiscordGuildMemberRemove) => void): this;
    on(event: 'guildMemberUpdate', listener: (memeber: DiscordGuildMemberUpdate) => void): this;
    on(event: 'guildRoleCreate', listener: (upsert: DiscordGuildRoleUpsert) => void): this;
    on(event: 'guildRoleUpdate', listener: (upsert: DiscordGuildRoleUpsert) => void): this;
    on(event: 'guildRoleDelete', listener: (upsert: DiscordGuildRoleDelete) => void): this;
    on(event: 'channelCreate', listener: (channel: DiscordChannel) => void): this;
    on(event: 'channelUpdate', listener: (channel: DiscordChannel) => void): this;
    on(event: 'channelDelete', listener: (channel: DiscordChannel) => void): this;
    on(event: 'channelPinsUpdate', listener: (channelPinsUpdate: DiscordChannelPinsUpdate) => void): this;
    // eslint-disable-next-line max-len
    on(event: 'applicationCommandPermissionsUpdate', listener: (permissionsUpdate: DiscordApplicationCommandPermissions) => void): this;
    on(event: 'stageInstanceCreate', listener: (stageInstance: DiscordStageInstance) => void): this;
    on(event: 'stageInstanceDelete', listener: (stageInstance: DiscordStageInstance) => void): this;
    on(event: 'stageInstanceUpdate', listener: (stageInstance: DiscordStageInstance) => void): this;
    on(event: 'threadListSync', listener: (threadListSync: DiscordThreadListSync) => void): this;
    on(event: 'userUpdate', listener: (user: DiscordUser) => void): this;

    on(event: string, listener: () => void): this;
}

type Events = {
    [type: string]: {
        eventId: string
        dataMap: (data: any) => any
    }
}
const EVENTS_MAP: Events = {};
function addEvent(type: string, eventId: string, dataMap: (data: any) => any) {
    EVENTS_MAP[type] = { eventId, dataMap };
}

addEvent('MESSAGE_CREATE', 'messageCreate', DiscordMessage.fromJson);
addEvent('MESSAGE_UPDATE', 'messageUpdate', DiscordMessage.fromJson);
addEvent('MESSAGE_DELETE', 'messageDelete', DiscordMessageDelete.fromJson);
addEvent('MESSAGE_DELETE_BULK', 'messageDeleteBulk', DiscordMessageDeleteBulk.fromJson);
addEvent('MESSAGE_REACTION_ADD', 'messageReactionAdd', DiscordMessageReactionAdd.fromJson);
addEvent('MESSAGE_REACTION_REMOVE', 'messageReactionRemove', DiscordMessageReactionRemove.fromJson);
addEvent('MESSAGE_REACTION_REMOVE_ALL', 'messageReactionRemoveAll', DiscordMessageReactionRemoveAll.fromJson);
addEvent('MESSAGE_REACTION_REMOVE_EMOJI', 'messageReactionRemoveEmoji', DiscordMessageReactionRemoveEmoji.fromJson);
addEvent('INTERACTION_CREATE', 'interactionCreate', DiscordInteraction.fromJson);
addEvent('GUILD_CREATE', 'guildCreate', DiscordGuild.fromJson);
addEvent('GUILD_DELETE', 'guildDelete', DiscordGuild.fromJson);
addEvent('GUILD_UPDATE', 'guildUpdate', DiscordGuild.fromJson);
addEvent('GUILD_MEMBER_ADD', 'guildMemberAdd', DiscordGuildMember.fromJson);
addEvent('GUILD_MEMBER_REMOVE', 'guildMemberRemove', DiscordGuildMemberRemove.fromJson);
addEvent('GUILD_MEMBER_UPDATE', 'guildMemberUpdate', DiscordGuildMemberUpdate.fromJson);
addEvent('GUILD_ROLE_CREATE', 'guildRoleCreate', DiscordGuildRoleUpsert.fromJson);
addEvent('GUILD_ROLE_UPDATE', 'guildRoleUpdate', DiscordGuildRoleUpsert.fromJson);
addEvent('GUILD_ROLE_DELETE', 'guildRoleDelete', DiscordGuildRoleDelete.fromJson);
addEvent('CHANNEL_CREATE', 'channelCreate', DiscordChannel.fromJson);
addEvent('CHANNEL_UPDATE', 'channelUpdate', DiscordChannel.fromJson);
addEvent('CHANNEL_DELETE', 'channelDelete', DiscordChannel.fromJson);
addEvent('CHANNEL_PINS_UPDATE', 'channelPinsUpdate', DiscordChannelPinsUpdate.fromJson);
// eslint-disable-next-line max-len
addEvent('APPLICATION_COMMAND_PERMISSIONS_UPDATE', 'applicationCommandPermissionsUpdate', DiscordApplicationCommandPermissions.fromJson);
addEvent('STAGE_INSTANCE_CREATE', 'stageInstanceCreate', DiscordStageInstance.fromJson);
addEvent('STAGE_INSTANCE_DELETE', 'stageInstanceDelete', DiscordStageInstance.fromJson);
addEvent('STAGE_INSTANCE_UPDATE', 'stageInstanceUpdate', DiscordStageInstance.fromJson);
addEvent('THREAD_LIST_SYNC', 'threadListSync', DiscordThreadListSync.fromJson);
addEvent('USER_UPDATE', 'userUpdate', DiscordUser.fromJson);


export class DiscordMinimal extends events.EventEmitter {
    private websocket: WebSocketData[] = [];
    private heartbeat: NodeJS.Timer[] = [];
    // This should proably be done better...
    // Probably switch to some sort of Request Builder
    public static token?: string;

    private intents: number;
    private shards = 1;
    private gatewayUrl = '';

    constructor(intents: number[]) {
        super();
        this.intents = intents.reduce((sum, a) => sum + a, 0);
    }

    public async login(token: string) {
        DiscordMinimal.token = token;

        const gatewayInfo = await getGatewayBot().catch(e => { console.log(e); return new DiscordGatewayBotInfo({}); });

        this.gatewayUrl = gatewayInfo.url;
        this.shards = gatewayInfo.shards;

        const interval = setInterval(() => {
            const startIndex = this.websocket.length;
            const max = Math.min(gatewayInfo.session_start_limit.max_concurrency, this.shards - startIndex);
            for (let i = 0; i < max; i++)
                this.initGatewaySocket(this.gatewayUrl, startIndex + i);

            if (this.websocket.length === this.shards)
                clearInterval(interval);
        }, 7000);
    }

    private initGatewaySocket(gatewayUrl: string, shardId: number) {
        const ws = new WebSocket(`${gatewayUrl}/?v=8&encoding=json`);

        const wsd = new WebSocketData(ws, shardId);
        this.websocket[shardId] = wsd;

        ws.addEventListener('message', (event) => this.onMessage(wsd, event, shardId));
        ws.addEventListener('close', (event) => this.onClose(event, shardId));
        ws.addEventListener('open', (event) => this.onOpen(event, shardId));
        ws.addEventListener('error', (error) => console.error(error));

    }

    private onMessage(wsd: WebSocketData, event: MessageEvent, shardNum: number) {
        const message: GatewayPayload = Object.assign(new GatewayPayload(), JSON.parse(event.data));
        if (message.s)
            wsd.seq = message.s;

        this.debug(`Message on shard \`${shardNum}\` | OP: ${message.op}`);

        switch (message.op) {
            case 0:
                this.onEvent(message, wsd);
                break;
            case 7:
            case 9:
                if (message.d)
                    this.sendPayload(wsd.ws, new ResumePayload(DiscordMinimal.token ?? '', wsd.session_id, wsd.seq));
                break;
            case 10:
                this.startHeartbeat(wsd, shardNum, parseInt(message.d.heartbeat_interval));
                if (wsd.resume)
                    this.sendPayload(wsd.ws, new ResumePayload(DiscordMinimal.token ?? '', wsd.session_id, wsd.seq));
                else
                    this.sendPayload(
                        wsd.ws,
                        new IdentifyPayload(DiscordMinimal.token ?? '', this.intents, [shardNum, this.shards])
                    );
                break;
            case 11:
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
        this.debug(`Shard \`${shardId}\` open! Event type: ${event.type} `);
    }

    private onClose(event: CloseEvent, shardId: number) {
        const code = event.code;

        clearInterval(this.heartbeat[shardId]);

        this.debug(`Shard \`${shardId}\` closed! Code: ${code} | Reason: ${event.reason} `);

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
        const socketData = this.websocket.find(wsd => wsd.shard === shardId);
        if (socketData) {
            socketData.resume = true;
            socketData.ws.removeAllListeners();
            socketData.ws.close(1002);

            const ws = new WebSocket(`${this.gatewayUrl}/?v=8&encoding=json`);
            socketData.ws = ws;
            ws.addEventListener('message', (event) => this.onMessage(socketData, event, shardId));
            ws.addEventListener('close', (event) => this.onClose(event, shardId));
            ws.addEventListener('error', (error) => console.error(error));
        }
    }

    private initReconnectFull() {
        for (let i = 0; i < this.websocket.length; i++)
            this.websocket[i].ws.removeAllListeners();
        this.websocket = [];
        this.login(DiscordMinimal.token ?? '');
    }

    public sendPayload(ws: WebSocket, message: GatewayPayload): void {
        if (ws.readyState === OPEN)
            ws.send(JSON.stringify(message));
    }

    private onEvent(json: GatewayPayload, wsd: WebSocketData): void {
        const eventId = json.t;

        this.debug(`Event recieved | Shard: ${wsd.shard} | ID: ${eventId}`);

        if(!eventId){
            return;
        }

        const event = EVENTS_MAP[eventId];
        if (event) {
            this.emit(event.eventId, event.dataMap(json.d));
        }
        else if (eventId === 'READY') {
            const ready = new DiscordReady(json.d);
            wsd.session_id = ready.session_id;
            this.emit('ready', ready);
        }
        else if (eventId === 'RESUMED') {
            this.emit('resumed');
        }
        // eslint-disable-next-line max-len
        else if (['GUILD_JOIN_REQUEST_UPDATE', 'GUILD_JOIN_REQUEST_DELETE', 'GUILD_APPLICATION_COMMAND_INDEX_UPDATE', 'GIFT_CODE_UPDATE'].includes(eventId)) {
            //TODO: I've seen these event id's but no idea what their payload is... Can't find docs on them
        }
        else {
            console.log('UNKNOWN EVENT!', eventId);
        }
    }

    private startHeartbeat(wsd: WebSocketData, shardNum: number, heartbeatDelay: number) {
        if (this.heartbeat[shardNum])
            clearInterval(this.heartbeat[shardNum]);

        this.heartbeat[shardNum] = setInterval(
            () => {
                this.sendPayload(wsd.ws, new HeartBeatPayload(wsd.seq));
                this.debug(`Heartbeat | Shard: ${shardNum} | Delay: ${heartbeatDelay}`);
            }, heartbeatDelay
        );
    }

    public createGlobalCommand(command: DiscordApplicationCommand) {
        createGlobalApplicationCommand(command);
    }
}

export default DiscordMinimal;