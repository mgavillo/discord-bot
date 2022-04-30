const { Client} = require('discord.js');
const firstMessage = require("./firstMessage");
const ROLE_CHAN_ID = '933687641298325574';

//add explaination
const emojis = {
    Netrunner: 'Netrunner',
    CyberdelicJester: 'CyberdelicJester',
    eBlacksmith: 'eBlacksmith',
}
let messageToReact = "Hi sir !\nI'm the lady of the Lake and I'll help you in your quests. The first one is to pick your area of interest for contribution.\nChose between those character please \n"

/**
 * 
 * @param {MessageReaction} reaction 
 * @param {*} user 
 * @param {*} add 
 */
 const handleReaction = (reaction, user, add) => {
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    console.log(roleName)
    if (!roleName) {return}
    const role = guild.roles.cache.find(role => role.name === roleName);
    if (!role) {return}
    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        member.roles.add(role);
        // member.send("You should check the Broceliande space that just appeared.")
    } else {
        member.roles.remove(role);
    }
}


/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const channel = client.channels.cache.find((channel) => channel.id === ROLE_CHAN_ID);
    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName)
    
    let reactions = [];
    for (let key in emojis){
        let emoji = getEmoji(emojis[key]);
        // console.log(emoji)
        if (emoji !== emoji ) return;
        
        reactions.push(emoji);
        messageToReact += `${emoji} : ${emojis[key]} \n`
    }
    firstMessage(channel, messageToReact, reactions);


    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, add = true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, add = false);
        }
    });
}