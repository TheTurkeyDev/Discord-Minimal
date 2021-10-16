import ReconnectingWebSocket, { CloseEvent, ErrorEvent } from 'reconnecting-websocket';
import WS from 'ws';
import GatewayPayload from './payloads/gateway-paylod';
import HeartBeatPayload from './payloads/heartbeat-payload';
import IdentifyPayload from './payloads/identify-payload';
import { DiscordEventListenerMap, DiscordEventMap } from './events';
import DiscordMessage from './data-objects/discord-message';

export type ListenersMap = {
    messageCreate: Array<DiscordEventListenerMap['messageCreate']>;
    interactionCreate: Array<DiscordEventListenerMap['interactionCreate']>;
    messageReactionAdd: Array<DiscordEventListenerMap['messageReactionAdd']>;
};

export default class DiscordMinimal {
    private websocket;
    private heartbeat: NodeJS.Timer | undefined;
    private previousSeq = -1;
    private token: string;

    private intents: number

    private listeners: ListenersMap = {
        messageCreate: [],
        interactionCreate: [],
        messageReactionAdd: [],
    };

    constructor(token: string, intents: number[]) {
        this.token = token;
        this.intents = intents.reduce((sum, a) => sum + a, 0);

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
                this.sendPayload(new IdentifyPayload(this.token, this.intents));
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
        setTimeout(() => this.websocket.reconnect(), 1000);
    }

    public sendPayload(message: GatewayPayload): void {
        this.websocket.send(JSON.stringify(message));
    }

    private onEvent(json: GatewayPayload): void {
        const eventId = json.t;
        switch (eventId) {
            case 'MESSAGE_CREATE':
                this.dispatch('messageCreate', json.d as DiscordMessage);
                break;
        }
    }

    private startHeartbeat(heartbeatDelay: number) {
        if (this.heartbeat)
            clearInterval(this.heartbeat);

        this.heartbeat = setInterval(() => this.sendPayload(new HeartBeatPayload(this.previousSeq)), heartbeatDelay);
    }

    public on<T extends keyof DiscordEventListenerMap>(type: T, listener: DiscordEventListenerMap[T]): void {
        if (this.listeners[type])
            this.listeners[type].push(listener);
    }

    public dispatch<T extends keyof DiscordEventListenerMap>(type: T, event: DiscordEventMap[T]): boolean {
        this.listeners[type as keyof DiscordEventListenerMap]?.forEach(listener => listener(event));
        return true;
    }
}