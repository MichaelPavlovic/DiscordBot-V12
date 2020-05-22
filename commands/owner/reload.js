module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user has the same id as the bot owner so only the owner of the bot can use this command
        if(message.author.id !== owner) return message.channel.send('Sorry only the owner can use this command');

        //check if there is a specified a folder to check
        if(!args[0]) return message.channel.send('Enter a folder to search');
      
        //check if there is a specified a command name to reload
        if(!args[1]) return message.channel.send('Enter a command to reload');

        //set folder name and command name and convert them to lowercase
        let folderName = args[0].toLowerCase();
        let commandName = args[1].toLowerCase();

        //attempt to reload the command
        try {
            delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)]; //

            client.commands.delete(commandName);
            
            const req = require(`../${folderName}/${commandName}.js`);
            client.commands.set(commandName, req);
        } catch (err){
            console.log(err); //log the error if it occurs

            //send a message to the channel asking the user if they typed the wrong command
            return message.channel.send(`Unable to reload: \`${commandName}\`, are you sure it exists?`); //
        }

        //send a message to the channel if the command is successfully reloaded
        message.channel.send(`Successfully reloaded: \`${commandName}\``);
    },
    config: {
        name: 'reload',
        description: 'Reloads a command',
        usage: '!reload [folder] [command]',
        category: 'owner',
        accessableby: 'Bot Owner',
        aliases: []
    }
}