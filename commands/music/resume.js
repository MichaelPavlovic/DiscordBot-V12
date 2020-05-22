//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel that the user is in
        const { channel } = message.member.voice;

        //if the voice channel does not exist return a message
        if(!channel){
            return message.channel.send("**You have to be in a voice channel to resume the music.**");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if the queue does not exist return a message to the channel
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }
        
        //check if the queue exists and the music is NOT playing
        if(serverQueue && !serverQueue.playing){
            //start playing the music again
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
        
            return message.channel.send(":play_pause: **Resuming**");
        } else{
            message.channel.send("**The music is already playing**"); //return a message if the queue is playing
        }
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