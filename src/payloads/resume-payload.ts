import { GatewayPayload } from './gateway-payload';

export class ResumePayload extends GatewayPayload {

    constructor(token: string, session_id: string, seq: number) {
        super();
        this.op = 6;
        this.d = {
            token,
            session_id,
            seq
        };
    }
}