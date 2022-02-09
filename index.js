const Discord = require("discord.js");
const { Client, Collection, Intents } = require('discord.js');
const config = require("./config.json");

const claimRole = require("./utils/claimRole")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
// const avatar = require("./avatar.jpg");

client.login(config.BOT_TOKEN);

const prefix='!';
client.on("message", async function(message) {
    if (message.author.bot) return;
    // message.author.id
    if (!message.content.startsWith(prefix)) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        await message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
});

client.once("ready", function() {
    claimRole(client);
    client.user.setUsername("Lady of the Lake");

});