import { DiscordUser } from '..';
import { Snowflake } from '../custom-types';

export class DiscordSoundboardSoundDelete {

    /**
     * The ID of the source guild
     */
    public guild_id: Snowflake;

    /**
     * The ID of the soundboard sound
     */
    public sound_id: Snowflake;

    constructor(guild_id: Snowflake, sound_id: Snowflake) {
        this.guild_id = guild_id;
        this.sound_id = sound_id;
    }

    static fromJson(json: any): DiscordSoundboardSoundDelete {
        const newInst = new DiscordSoundboardSoundDelete(json.guild_id, json.sound_id);
        return newInst;
    }
}