/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '../custom-types/snowflake';

export class DiscordApplication {
    /**
     * The id of the app
     */
    public id: Snowflake;

    /**
     * The name of the app
     */
    public name: string;

    /**
     * The icon hash of the app
     */
    public icon?: string;

    /**
     * the description of the app
     */
    public description: string;

    /**
     * An array of rpc origin urls, if rpc is enabled
     */
    public rpc_origins?: string[];

    /**
     * when false only app owner can join the app's bot to guilds
     */
    public bot_public: boolean;

    // bot_require_code_grant	boolean	when true the app's bot will only join upon completion of the full oauth2 code grant flow
    // terms_of_service_url?	string	the url of the app's terms of service
    // privacy_policy_url?	string	the url of the app's privacy policy
    // owner?	partial user object	partial user object containing info on the owner of the application
    // summary	string	if this application is a game sold on Discord, this field will be the summary field for the store page of its primary sku
    // verify_key	string	the hex encoded key for verification in interactions and the GameSDK's GetTicket
    // team	?team object	if the application belongs to a team, this will be a list of the members of that team
    // guild_id?	snowflake	if this application is a game sold on Discord, this field will be the guild to which it has been linked
    // primary_sku_id?	snowflake	if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
    // slug?	string	if this application is a game sold on Discord, this field will be the URL slug that links to the store page
    // cover_image?	string	the application's default rich presence invite cover image hash
    // flags?	integer	the application's public flags

    constructor(id: Snowflake, name: string, description: string, bot_public: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.bot_public = bot_public;
    }

    static fromJson(json: any): DiscordApplication {
        const newInst = new DiscordApplication(json.id, json.name, json.description, json.bot_public);
        newInst.icon = json.icon;
        return newInst;
    }
}