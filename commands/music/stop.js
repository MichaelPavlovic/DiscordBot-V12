//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

module.exports = {
    run: async(client, message, args, owner) => {
        //get the channel that the user is in
        const { channel } = message.member.voice;

        //if the voice channel does not exist, return a message
        if(!channel){
            return message.channel.send("**You need to be in a voice channel to stop the music.**");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if there is no music queue return a message to the channel
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        //set the queue to empty
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end(); //leave the voice channel

        serverQueue.textChannel.send(":stop_button: **Disconnecting**");
    },
    config: {
        name: 'stop',
        description: 'Stops the music',
        usage: '!stop',
        category: 'music',
        accessableby: 'Members',
        aliases: ['end', 'leave']
    }
}