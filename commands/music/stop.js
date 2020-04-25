module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;
        if(!channel){
            return message.channel.send("**You need to be in a voice channel to stop the music.**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();

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