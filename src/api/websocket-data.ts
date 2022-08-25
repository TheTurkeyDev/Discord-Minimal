import WebSocket from 'ws';

export class WebSocketData {

    public ws: WebSocket;
    public shard: number;
    public resume = false;
    public resume_url = '';
    public session_id = '';
    public seq = -1;

    constructor(ws: WebSocket, shard: number) {
        this.ws = ws;
        this.shard = shard;
    }
}