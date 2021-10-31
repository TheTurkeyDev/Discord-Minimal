/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import ReconnectingWebSocket, { CloseEvent, ErrorEvent } from 'reconnecting-websocket';
import WS from 'ws';
import events from 'events';
import GatewayPayload from './payloads/gateway-paylod';
import HeartBeatPayload from './payloads/heartbeat-payload';
import IdentifyPayload from './payloads/identify-payload';
import DiscordMessage from './data-objects/discord-message';
import { DiscordInteraction, DiscordMessageReactionAdd } from '.';
import DiscordReady from './data-objects/discord-ready';
import DiscordMessageDelete from './data-objects/discord-message-delete';
import DiscordMessageDeleteBulk from './data-objects/discord-message-delete-bulk';

export declare interface DiscordMinimal {
    on(event: 'ready', listener: (ready: DiscordReady) => void): this;
    on(event: 'messageCreate', listener: (message: DiscordMessage) => void): this;
    on(event: 'messageDelete', listener: (message: DiscordMessageDelete) => void): this;
    on(event: 'messageDeleteBulk', listener: (messages: DiscordMessageDeleteBulk) => void): this;
    on(event: 'messageReactionAdd', listener: (messageReaction: DiscordMessageReactionAdd) => void): this;
    on(event: 'interactionCreate', listener: (interaction: DiscordInteraction) => void): this;
    on(event: string, listener: () => void): this;
}

export class DiscordMinimal extends events.EventEmitter {
    private websocket?: ReconnectingWebSocket;
    private heartbeat: NodeJS.Timer | undefined;
    private previousSeq = -1;
    // This should proably be done better...
    // Probably switch to some sort of Request Builder
    public static token?: string;

    private intents: number

    constructor(intents: number[]) {
        super();
        this.intents = intents.reduce((sum, a) => sum + a, 0);
    }

    public login(token: string) {
        DiscordMinimal.token = token;

        this.websocket = new ReconnectingWebSocket('wss://gateway.discord.gg/?v=8&encoding=json', [], {
            WebSocket: WS,
            connectionTimeout: 1000,
            maxRetries: 10,
        });

        this.websocket.addEventListener('message', (event) => this.onMessage(event));
        this.websocket.addEventListener('close', (event) => this.onClose(event));
        this.websocket.addEventListener('error', (error: ErrorEvent) => console.error(error.message));
    }

    private onMessage(event: MessageEvent) {
        const message: GatewayPayload = Object.assign(new GatewayPayload(), JSON.parse(event.data));
        if (message.s)
            this.previousSeq = message.s;

        switch (message.op) {
            case 0:
                this.onEvent(message);
                break;
            case 7:
            case 9:
                this.initReconnect();
                break; // fall through?
            case 10:
                this.startHeartbeat(parseInt(message.d.heartbeat_interval));
                this.sendPayload(new IdentifyPayload(DiscordMinimal.token ?? '', this.intents));
                break;
            case 11:
                //Heartbeat ACK
                break;
            default:
                console.log('[Discord] Unknown OP Code: ' + message.op);
        }
    }

    private onClose(event: CloseEvent) {
        const code = event.code;
        if (code == -1)
            this.initReconnect();
        else if (code == 1001)
            this.initReconnect();
        else if (code == 1006)
            this.initReconnect();
        else if (code == 4008)
            this.initReconnect();
        else
            console.log('[DISCORD] Closed: ' + code + ' - ' + event.reason);
    }

    private initReconnect() {
        setTimeout(() => this.websocket?.reconnect(), 1000);
    }

    public sendPayload(message: GatewayPayload): void {
        this.websocket?.send(JSON.stringify(message));
    }

    private onEvent(json: GatewayPayload): void {
        const eventId = json.t;
        switch (eventId) {
            case 'READY':
                this.emit('ready', new DiscordReady(json.d));
                break;
            case 'MESSAGE_CREATE':
                this.emit('messageCreate', new DiscordMessage(json.d));
                break;
            case 'MESSAGE_DELETE':
                this.emit('messageDelete', new DiscordMessageDelete(json.d));
                break;
            case 'MESSAGE_DELETE_BULK':
                this.emit('messageDeleteBulk', new DiscordMessageDeleteBulk(json.d));
                break;
            case 'MESSAGE_REACTION_ADD':
                this.emit('messageReactionAdd', new DiscordMessageReactionAdd(json.d));
                break;
            case 'INTERACTION_CREATE':
                this.emit('interactionCreate', new DiscordInteraction(json.d));
                break;
        }
    }

    private startHeartbeat(heartbeatDelay: number) {
        if (this.heartbeat)
            clearInterval(this.heartbeat);

        this.heartbeat = setInterval(() => this.sendPayload(new HeartBeatPayload(this.previousSeq)), heartbeatDelay);
    }
}

export default DiscordMinimal;