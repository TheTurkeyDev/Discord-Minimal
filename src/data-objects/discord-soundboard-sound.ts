import { DiscordUser } from '..';
import { Snowflake } from '../custom-types';

export class DiscordSoundboardSound {

    /**
     * The ID of the soundboard sound
     */
    public sound_id: Snowflake;

    /**
     * The name of the soundboard sound (2-32 characters)
     */
    public name: string;

    /**
     * The volume of the soundboard sound (represented as a float from 0 to 1)
     */
    public volume: number;

    /**
     * The ID of the sound's custom emoji
     */
    public emoji_id?: Snowflake;

    /**
     * The unicode character of the sound's emoji
     */
    public emoji_name?: string;

    /**
     * The ID of the source guild
     */
    public guild_id?: Snowflake;

    /**
     *	Whether this guild sound can be used; may be false due to loss of premium subscriptions (boosts)
     */
    public available: boolean;

    /**
     *  The user who created this sound
     *  partial user object
     */
    public user?: DiscordUser;

    /**
     *  The ID of the user who created this sound
     */
    public user_id?: Snowflake;

    constructor(sound_id: Snowflake, name: string, volume: number, available: boolean) {
        this.sound_id = sound_id;
        this.name = name;
        this.volume = volume;
        this.available = available;
    }

    static fromJson(json: any): DiscordSoundboardSound {
        const newInst = new DiscordSoundboardSound(json.sound_id, json.name, json.volume, json.available);
        newInst.emoji_id = json.emoji_id;
        newInst.emoji_name = json.emoji_name;
        newInst.user = json.user && DiscordUser.fromJson(json.user);
        newInst.user_id = json.user_id;
        return newInst;
    }
}