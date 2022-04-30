const Discord = require("discord.js");
const { Client, Collection, Intents } = require('discord.js');
const config = require("./config.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const claimRole = require("./utils/claimRole")
let xpTable = require("./xp.json")
const fs = require("fs");
const { getPackedSettings } = require("http2");
// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ].map(command => command.toJSON());


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES] });
// const avatar = require("./avatar.jpg");

client.login(config.BOT_TOKEN);

const prefix='!';


const addXp = (quantity, user) => {
    if(!xpTable[user])
        xpTable[user] = quantity
    else
        xpTable[user] += quantity
    fs.writeFile("./xp.json", JSON.stringify(xpTable), (err) => {
        if (err) console.error(err)})
}

const getXp = async function (message, user) {
    await message.reply(`You have ${xpTable[user]} xp`)
}

const getKings = async function(message){
    // let first, second, third = [null, 0]
    let first = [null, 0]
    let second = [null, 0]
    let third = [null, 0]
    
    for (var user in xpTable){
        if (xpTable[user] > first[1]){
            first[0] = user
            first[1] = xpTable[user]
        } 
        else if (xpTable[user] > second[1]){
            second[0] = user
            second[1] = xpTable[user] 
        }
        else if (xpTable[user] > third[1]){
            third[0] = user
            third[1] = xpTable[user] 
        }
    }
    let one = client.users.cache.get(first[0])
    let two = client.users.cache.get(second[0])
    let three = client.users.cache.get(third[0])    
    await message.reply(`1.${one}\n2.${two}\n3.${three}\n`)
}

client.on("messageCreate", async function(message) {
    if (message.author.bot) return;
    // message.author.id
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log(command)
    if (message.channelId === "945334148749479936" && command === 'lfg')
        addXp(10, message.member.id)
    if (command === 'xp')
        getXp(message, message.member.id)
    if (command === 'kings')
        getKings(message)
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        await message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
});

client.once("ready", function() {

    claimRole(client);
    client.user.setUsername("Lady of the Lake");
});