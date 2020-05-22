//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel the user is in
        const { channel } = message.member.voice;

        //if they are not in a voice channel send a message to the channel telling them they have to be in one
        if(!channel){
            return message.channel.send("**You have to be in a voice channel to loop the queue.** :x:");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if the queue doesn't exist return a message to the channel
        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        //enable or disable the queue depending on if its already enabled or disabled
        serverQueue.loop = !serverQueue.loop;
        message.channel.send(`**Loop is now: ${serverQueue.loop ? "Enabled" : "Disabled"}**`);
    },
    config: {
        name: 'loop',
        description: 'Loops the current queue',
        usage: '!loop',
        category: 'music',
        accessableby: 'Members',
        aliases: []
    }
}