module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user has the same id as the bot owner
        if(message.author.id !== owner) return message.channel.send('Sorry only the owner can use this command');

        try{
            await message.channel.send('Bot is shutting down...');
            message.delete();
            process.exit();//stop bot
        } catch(e){
            message.channel.send(`Error: ${e.message}`);//send error message to channel
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