//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel that the user is in
        const { channel } = message.member.voice;

        //if the channel does not exist return a message
        if(!channel){
            return message.channel.send("**You need to be a voice channel to skip a song!**");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if the queue does not exist return a message to the channel
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        //skip the current song
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