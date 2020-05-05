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

        let song = args[0];
        if(song < 1 || song >= serverQueue.songs.length + 1 || isNaN(song)){
            return message.channel.send("**Enter a valid song number**");
        }

        serverQueue.songs.splice(song - 1, 1);

        message.channel.send(`**Song ${song} removed**`);
    },
    config: {
        name: 'remove',
        description: 'Removes a specific song from the queue',
        usage: '!remove [number]',
        category: 'music',
        accessableby: 'Members',
        aliases: ['qr', 'r', 'queueremove']
    }
}