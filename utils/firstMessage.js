const {TextChannel, Message, Collection} = require("discord.js");

/**
 * 
 * @param {Message} message 
 * @param {Array} reactions 
 */
const addReaction = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length > 0){
        setTimeout(() => addReaction(message, reactions), 500);
    }
}


const initFirstMessage = async (channel, text, reactions) => {
    await channel.send(text).then(message => {
        addReaction(message, reactions)
    })
}

/**
 * 
 * @param {Collection<String, Messages>} messages 
 * @param {String} text 
 * @param {Array} reactions 
 */
const editFirstMessage = (messages, text, reactions) => {
    for (const message of messages){
        message[1].edit(text);
        if (reactions.size){
            addReaction(reactions);
        }
        return
    }
}

/**
 * 
 * @param {TextChannel} channel 
 * @param {String} text 
 * @param {Array} reactions 
 */

module.exports = (channel, text, reactions) => {
    channel.messages.fetch().then(messages => {
        if (messages.size === 0)
            initFirstMessage(channel, text, reactions);
        else if (messages.size > 0)
            editFirstMessage(messages, text, reactions);
    })
}