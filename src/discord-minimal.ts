/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import WebSocket, { OPEN } from 'ws';
import events from 'events';
import { createGlobalApplicationCommand, getGatewayBot } from './api/discord-api';
import { WebSocketData } from './api/websocket-data';
import { DiscordGatewayBotInfo } from './data-objects';
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
    on(event: 'ready', listener: (ready: DiscordReady) => void): this;
    on(event: 'messageCreate', listener: (message: DiscordMessage) => void): this;
    on(event: 'messageDelete', listener: (message: DiscordMessageDelete) => void): this;
    on(event: 'messageDeleteBulk', listener: (messages: DiscordMessageDeleteBulk) => void): this;
    on(event: 'messageReactionAdd', listener: (messageReaction: DiscordMessageReactionAdd) => void): this;
    on(event: 'interactionCreate', listener: (interaction: DiscordInteraction) => void): this;
    on(event: 'guildCreate', listener: (interaction: DiscordGuild) => void): this;
    on(event: 'guildDelete', listener: (interaction: DiscordGuild) => void): this;
    on(event: 'guildUpdate', listener: (interaction: DiscordGuild) => void): this;
    on(event: string, listener: () => void): this;
}

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
        ws.addEventListener('error', (error) => console.error(error));

    }

    private onMessage(wsd: WebSocketData, event: MessageEvent, shardNum: number) {
        const message: GatewayPayload = Object.assign(new GatewayPayload(), JSON.parse(event.data));
        if (message.s)
            wsd.seq = message.s;

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

    private onClose(event: CloseEvent, shardId: number) {
        const code = event.code;

        clearInterval(this.heartbeat[shardId]);

        switch (code) {
            case -1:
            case 1000:
            case 1001:
            case 1006:
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
        switch (eventId) {
            case 'READY':
                // eslint-disable-next-line no-case-declarations
                const ready = new DiscordReady(json.d);
                wsd.session_id = ready.session_id;
                this.emit('ready', ready);
                break;
            case 'RESUMED':
                //TODO!
                break;
            case 'MESSAGE_CREATE':
                this.emit('messageCreate', DiscordMessage.fromJson(json.d));
                break;
            case 'MESSAGE_UPDATE':
                //TODO!
                break;
            case 'MESSAGE_DELETE':
                this.emit('messageDelete', DiscordMessageDelete.fromJson(json.d));
                break;
            case 'MESSAGE_DELETE_BULK':
                this.emit('messageDeleteBulk', DiscordMessageDeleteBulk.fromJson(json.d));
                break;
            case 'MESSAGE_REACTION_ADD':
                this.emit('messageReactionAdd', DiscordMessageReactionAdd.fromJson(json.d));
                break;
            case 'MESSAGE_REACTION_REMOVE':
                //TODO!
                break;
            case 'MESSAGE_REACTION_REMOVE_EMOJI':
                //TODO!
                break;
            case 'MESSAGE_REACTION_REMOVE_ALL':
                //TODO!
                break;
            case 'INTERACTION_CREATE':
                this.emit('interactionCreate', DiscordInteraction.fromJson(json.d));
                break;
            case 'GUILD_CREATE':
                this.emit('guildCreate', DiscordGuild.fromJson(json.d));
                break;
            case 'GUILD_DELETE':
                this.emit('guildDelete', DiscordGuild.fromJson(json.d));
                break;
            case 'GUILD_UPDATE':
                this.emit('guildUpdate', DiscordGuild.fromJson(json.d));
                break;
            case 'GUILD_MEMBER_UPDATE':
                //TODO!
                break;
            case 'GUILD_ROLE_CREATE':
                //TODO!
                break;
            case 'GUILD_ROLE_UPDATE':
                //TODO!
                break;
            case 'GUILD_ROLE_DELETE':
                //TODO!
                break;
            case 'GUILD_JOIN_REQUEST_UPDATE':
                //TODO!
                break;
            case 'GUILD_JOIN_REQUEST_DELETE':
                //TODO!
                break;
            case 'CHANNEL_CREATE':
                //TODO!
                break;
            case 'CHANNEL_UPDATE':
                //TODO!
                break;
            case 'CHANNEL_DELETE':
                //TODO!
                break;
            case 'CHANNEL_PINS_UPDATE':
                //TODO!
                break;
            case 'APPLICATION_COMMAND_PERMISSIONS_UPDATE':
                //TODO!
                break;
            case 'STAGE_INSTANCE_CREATE':
                //TODO!
                break;
            case 'STAGE_INSTANCE_DELETE':
                //TODO!
                break;
            case 'STAGE_INSTANCE_UPDATE':
                //TODO!
                break;
            case 'THREAD_LIST_SYNC':
                //TODO!
                break;
            case 'USER_UPDATE':
                //TODO!
                break;
            case 'GIFT_CODE_UPDATE':
                //TODO!
                break;
            default:
                console.log('UNKNOWN EVENT!', eventId);
        }
    }

    private startHeartbeat(wsd: WebSocketData, shardNum: number, heartbeatDelay: number) {
        if (this.heartbeat[shardNum])
            clearInterval(this.heartbeat[shardNum]);

        this.heartbeat[shardNum] = setInterval(
            () => this.sendPayload(wsd.ws, new HeartBeatPayload(wsd.seq)), heartbeatDelay
        );
    }

    public createGlobalCommand(command: DiscordApplicationCommand) {
        createGlobalApplicationCommand(command);
    }
}

export default DiscordMinimal;