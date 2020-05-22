module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel
        const { channel } = message.member.voice;

        //if the channel does not exist return a message
        if(!channel){
            return message.channel.send("**You need to be a voice channel to skip a song!**");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if the queue does not exist return a message
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        //get the first argument
        let song = args[0];
        //check if it is less than 1 because there would be at least 1 song in the queue so the number should be at least 1
        //check if the argument is greater than the length of the queue
        //check if the argument is not a number
        //check if the argument is an integer
        if(song < 1 || song >= serverQueue.songs.length + 1 || isNaN(song) || !Number.isInteger(+song)){
            return message.channel.send("**Enter a valid song number**"); //return error message if it's not valid
        }

        //remove the selected song from the queue
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