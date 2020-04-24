module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the current song.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**Nothing playing.**");
        }
        
        message.channel.send(serverQueue.songs[0].title);
    },
    config: {
        name: 'np',
        description: 'Displays the current song',
        usage: '!np',
        category: 'music',
        accessableby: 'Members',
        aliases: ['nowplaying', 'now', 'current', 'song']
    }
}