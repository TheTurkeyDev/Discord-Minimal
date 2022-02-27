import { GatewayPayload } from './gateway-payload';

export class IdentifyPayload extends GatewayPayload
{

    constructor(token: string, intents: number, shard: number[])
    {
        super();
        this.op = 2;
        this.d = {
            token: token,
            intents: intents,
            shard: shard,
            properties: {
                $os: process.platform,
                $browser: 'discord-minimal',
                $device: 'discord-minimal'
            },
        };
    }
}