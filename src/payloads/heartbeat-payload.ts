import { GatewayPayload } from './gateway-payload';

export class HeartBeatPayload extends GatewayPayload {

    constructor(seq: number) {
        super();
        this.op = 1;
        this.d = seq == -1 ? null : seq;
    }
}