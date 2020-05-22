module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user has the same id as the bot owner to make sure that only the owner of the bot can use this command
        if(message.author.id !== owner) return message.channel.send('Sorry only the owner can use this command');

        //attempt to shutdown the bot
        try{
            await message.channel.send('Bot is shutting down...'); //send a message to the channel
            message.delete(); //delete the message that the user sent
            process.exit(); //stop bot
        } catch(e){
            message.channel.send(`Error: ${e.message}`); //send error message to channel if one is encountered
        }
    },
    config: {
        name: 'shutdown',
        description: 'Stops the bot',
        usage: '!shutdown',
        category: 'owner',
        accessableby: 'Bot Owner',
        aliases: ['stop']
    }
}