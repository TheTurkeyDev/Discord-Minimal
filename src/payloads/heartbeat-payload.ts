import GatewayPayload from './gateway-paylod';

export default class HeartBeatPayload extends GatewayPayload {

    constructor(seq: number) {
        super();
        this.op = 1;
        this.d = seq == -1 ? null : seq;
    }
}