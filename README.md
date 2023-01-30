![Logo](/logo.png)
Logo by JCOnline
___
<br>
This project was started as a replacement for DiscordJS because I simply didn't need a majority of the more "advanced" features that were offered and instead just needed a really simple light weight Wrapper for the Discord API.

Here's an example of a basic bot you can make with this library:
```js
const { DiscordMinimal, INTENTS } = require('discord-minimal');

const client = new DiscordMinimal([ INTENTS.GUILDS, INTENTS.GUILD_MESSAGES, INTENTS.MESSAGE_CONTENT ]);

client.once('ready', () => {
    console.log(`Logged in!`);
});

client.on('messageCreate', message => {
    if (message.content === 'hello') {
        message.reply(`Hello ${message.author.username}!`);
    }
});

// you should store this token securely in a .env or config file
// this file should not be commited to version control or shared with anybody
// the token gives malicious actors access to your bot
client.login('token goes here');
```
