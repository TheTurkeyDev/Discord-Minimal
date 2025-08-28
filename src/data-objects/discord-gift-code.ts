import { Snowflake } from '../custom-types';

export class DiscordGiftCode {

    /**
     * The gift code
     */
    public code: string;

    /**
     * The ID of the SKU that the gift code grants
     */
    public sku_id: Snowflake;

    /**
     * The number of times the gift code has been used
     */
    public uses: number;

    /**
     * The ID of the channel the gift code was sent in
     */
    public channel_id: Snowflake;

    /**
     * The ID of the guild the gift code was sent in
     */
    public guild_id: Snowflake;

    constructor(code: string, sku_id: Snowflake, uses: number, channel_id: Snowflake, guild_id: Snowflake) {
        this.code = code;
        this.sku_id = sku_id;
        this.uses = uses;
        this.channel_id = channel_id;
        this.guild_id = guild_id;
    }

    static fromJson(json: any): DiscordGiftCode {
        const newInst = new DiscordGiftCode(json.code, json.sku_id, json.uses, json.channel_id, json.guild_id);
        return newInst;
    }
}