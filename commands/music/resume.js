module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to resume the music.**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(serverQueue && !serverQueue.playing){
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
        
            return message.channel.send(":play_pause: **Resuming**");
        }
    
        message.channel.send("**There is nothing in the queue.**")
    },
    config: {
        name: 'resume',
        description: 'Resumes the song',
        usage: '!resume',
        category: 'music',
        accessableby: 'Members',
        aliases: []
    }
}