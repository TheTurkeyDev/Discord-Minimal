/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Snowflake } from '..';

export default class DiscordApplication {
    public id: Snowflake;	                // The id of the app
    // name	string	the name of the app
    // icon	?string	the icon hash of the app
    // description	string	the description of the app
    // rpc_origins?	array of strings	an array of rpc origin urls, if rpc is enabled
    // bot_public	boolean	when false only app owner can join the app's bot to guilds
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

    constructor(id: Snowflake) {
        this.id = id;
    }

    static fromJson(json: any): DiscordApplication {
        const newInst = new DiscordApplication(json.id);
        return newInst;
    }
}