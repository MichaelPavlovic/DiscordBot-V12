module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You need to be in a voice channel to pause a song.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }
        
        if(serverQueue && serverQueue.playing){
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
        }

        return message.channel.send(":pause_button: **Paused**");
    },
    config: {
        name: 'pause',
        description: 'Pauses the current song',
        usage: '!pause',
        category: 'music',
        accessableby: 'Members',
        aliases: []
    }
}