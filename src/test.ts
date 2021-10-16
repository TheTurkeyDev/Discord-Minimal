import DiscordMinimal from './discord-minimal';
import { INTENTS } from './custom-types/discord-intents';
import dotenv from 'dotenv';

dotenv.config();
const client = new DiscordMinimal(process.env.TOKEN ?? '', [INTENTS.GUILD_MESSAGES]);

client.on('messageCreate', message => {
    console.log(message.id + ' from ' + message.author.username);
});