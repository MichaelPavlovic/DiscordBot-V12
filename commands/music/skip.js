module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You need to be a voice channel to skip a song!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        serverQueue.connection.dispatcher.end();
        message.channel.send(":track_next: **Skipping the song...**");
    },
    config: {
        name: 'skip',
        description: 'Skips the current song',
        usage: '!skip',
        category: 'music',
        accessableby: 'Members',
        aliases: ['s', 'next']
    }
}