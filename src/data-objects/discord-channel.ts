/* eslint-disable @typescript-eslint/no-explicit-any */

import { DiscordChannelType } from '../custom-types';
import { DiscordVideoQualityMode } from '../custom-types/discord-video-quality-modes';
import { Snowflake } from '../custom-types/snowflake';

export class DiscordChannel {
    /**
     * The id of this channel
     */
    public id: Snowflake;

    /**
     * The type of channel
     */
    public type: DiscordChannelType;

    /**
     * The id of the guild (may be missing for some channel objects received over gateway guild dispatches)
     */
    public guild_id?: Snowflake;

    /**
     * Sorting position of the channel
     */
    public position?: number;

    // permission_overwrites?	array of overwrite objects	explicit permission overwrites for members and roles

    /**
     * The name of the channel (1-100 characters)
     */
    public name?: string;

    /**
     * The channel topic (0-1024 characters)
     */
    public topic?: string;

    /**
     * Whether the channel is nsfw
     */
    public nsfw?: boolean;

    /**
     * The id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
     */
    public last_message_id?: Snowflake;

    /**
     * The bitrate (in bits) of the voice channel
     */
    public bitrate?: number;

    /**
     * The user limit of the voice channel
     */
    public user_limit?: number;

    /**
     * Amount of seconds a user has to wait before sending another message (0-21600); 
     * bots, as well as users with the permission manage_messages or manage_channel, are unaffected
     * * rate_limit_per_user also applies to thread creation. Users can send one message and create one thread during each rate_limit_per_user interval.
     */
    public rate_limit_per_user?: number;

    // recipients?	array of user objects	the recipients of the DM

    /**
     * Icon hash of the group DM
     */
    public icon?: string;

    /**
     * Id of the creator of the group DM or thread
     */
    public owner_id?: Snowflake;

    /**
     * Application id of the group DM creator if it is bot-created
     */
    public application_id?: Snowflake;

    /**
     * For guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
     */
    public parent_id?: Snowflake;

    /**
     * ISO8601 timestamp - When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.
     */
    public last_pin_timestamp?: string;

    /**
     * Voice region id for the voice channel, automatic when set to null
     */
    public rtc_region?: string;

    /**
     * The camera video quality mode of the voice channel, 1 when not present
     */
    public video_quality_mode?: DiscordVideoQualityMode;

    /**
     * Number of messages (not including the initial message or deleted messages) in a thread (if the thread was created before July 1, 2022, it stops counting at 50)
     */
    public message_count?: number;

    /**
     * An approximate count of users in a thread, stops counting at 50
     */
    public member_count?: number;

    // thread_metadata?	a thread metadata object	thread-specific fields not needed by other channels
    // member?	a thread member object	thread member object for the current user, if they have joined the thread, only included on certain API endpoints

    /**
     * Default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
     */
    public default_auto_archive_duration?: number;

    /**
     * Computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
     */
    public permissions?: string;

    /**
     * Integer	channel flags combined as a bitfield
     */
    public flags?: number;

    /**
     * Number of messages ever sent in a thread, it's similar to message_count on message creation, but will not decrement the number when a message is deleted
     */
    public total_message_sent?: number;

    // available_tags?	array of tag objects	the set of tags that can be used in a GUILD_FORUM channel

    /**
     * The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM channel
     */
    public applied_tags?: Snowflake[] = [];
    // default_reaction_emoji?	?default reaction object	the emoji to show in the add reaction button on a thread in a GUILD_FORUM channel
    
    /**
     * The initial rate_limit_per_user to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update.
     */
    public default_thread_rate_limit_per_user?: number;

    constructor(id: Snowflake, type: DiscordChannelType) {
        this.id = id;
        this.type = type;
    }

    static fromJson(json: any): DiscordChannel {
        const newInst = new DiscordChannel(json.id, json.type);
        newInst.guild_id = json.guild_id;
        newInst.position = json.position;
        newInst.name = json.name;
        newInst.topic = json.topic;
        newInst.nsfw = json.nsfw;
        newInst.last_message_id = json.last_message_id;
        newInst.bitrate = json.bitrate;
        newInst.user_limit = json.user_limit;
        newInst.rate_limit_per_user = json.rate_limit_per_user;
        newInst.icon = json.icon;
        newInst.owner_id = json.owner_id;
        newInst.application_id = json.application_id;
        newInst.parent_id = json.parent_id;
        newInst.last_pin_timestamp = json.last_pin_timestamp;
        newInst.rtc_region = json.rtc_region;
        newInst.video_quality_mode = json.video_quality_mode;
        newInst.message_count = json.message_count;
        newInst.member_count = json.member_count;
        newInst.default_auto_archive_duration = json.default_auto_archive_duration;
        newInst.permissions = json.permissions;
        newInst.flags = json.flags;
        newInst.total_message_sent = json.total_message_sent;
        newInst.applied_tags = json.applied_tags;
        newInst.default_thread_rate_limit_per_user = json.default_thread_rate_limit_per_user;
        return newInst;
    }
}