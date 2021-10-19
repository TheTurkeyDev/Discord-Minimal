import DiscordMinimal from './discord-minimal';
import { INTENTS } from './custom-types/discord-intents';
import dotenv from 'dotenv';
import { DiscordMessage, DiscordMessageReactionAdd, DiscordReady } from '.';

dotenv.config();
const client = new DiscordMinimal(process.env.TOKEN ?? '', [INTENTS.GUILD_MESSAGES, INTENTS.GUILD_MESSAGE_REACTIONS]);

client.on('ready', (ready: DiscordReady) => {
    //console.log(ready);
});

client.on('messageCreate', (message: DiscordMessage) => {
    console.log(message.id + ' from ' + message.author.username + ' in ' + message.guild_id);
});

client.on('messageReactionAdd', (reaction: DiscordMessageReactionAdd) => {
    console.log(reaction);
});