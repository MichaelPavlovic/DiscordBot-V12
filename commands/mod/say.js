module.exports = {
    run: async(client, message, args, owner) => {
        //check if user has permission to use the command
        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!");
        
        let argsResult;
        let channelName = message.mentions.channels.first(); //get the mentioned channel

        message.delete(); //delete the command message

        //check if the mentioned channel exists
        if(channelName){
            argsResult = args.slice(1).join(" "); //remove the channel name from the rest of the arguments and join them together separated by spaces
            channelName.send(argsResult); //send the message to the specific channel
        } else{
            //if no channel was mentioned or the mentioned channel can't be found
            argsResult = args.join(" "); //join the arguments together separated by spaces
            message.channel.send(argsResult); //send the message to the channel that the command was run in
        }
    },
    config: {
        name: 'say',
        description: 'Sends a bot message to specified channel',
        usage: '!say [channel] [message]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: ['bc', 'alert', 'broadcast', 'announce', 'announcement']
    }
}