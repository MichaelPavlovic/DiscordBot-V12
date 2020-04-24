module.exports = {
    run: async(client, message, args, owner) => {
        //check if user has permission to use the command
        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!");
        
        let argsResult;
        let channelName = message.mentions.channels.first();//get the mentioned channel

        message.delete();//deletes command message

        //check if there was a channel mentioned
        if(channelName){
            argsResult = args.slice(1).join(" ");//remove the channel name from the rest of the arguments
            channelName.send(argsResult);
        } else{
            argsResult = args.join(" ");
            message.channel.send(argsResult);
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