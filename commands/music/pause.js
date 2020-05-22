//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel that the user is in
        const { channel } = message.member.voice;

        //if they are not in a voice channel return a message to the channel
        if(!channel){
            return message.channel.send("**You need to be in a voice channel to pause a song.** :x:");
        }

        //get the queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if the queue does not exist return a message to the channel
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }
        
        //check if there is a queue and if it is playing
        if(serverQueue && serverQueue.playing){
            //pause the music
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);

            //return a message saying that the queue is paused
            return message.channel.send(":pause_button: **Paused**");
        } else{
            //if the queue is already pasued return a message
            return message.channel.send("**The queue is already paused!**")
        }

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