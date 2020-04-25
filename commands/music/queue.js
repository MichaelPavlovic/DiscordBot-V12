module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the queue.**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**The queue is empty.**");
        }

        message.channel.send(`${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n\n")}`,{ split: true });
    },
    config: {
        name: 'queue',
        description: 'Skips the current song',
        usage: '!queue',
        category: 'music',
        accessableby: 'Members',
        aliases: ['q', 'songs']
    }
}