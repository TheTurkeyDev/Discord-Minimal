import GatewayPayload from './gateway-paylod';

export default class IdentifyPayload extends GatewayPayload {

    constructor(token: string, intents: number) {
        super();
        this.op = 2;
        this.d = {
            token: token,
            intents: intents,
            properties: {
                $os: process.platform,
                $browser: 'discord-minimal',
                $device: 'discord-minimal'
            },
        };
    }
}