module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if (!channel) {
            return message.channel.send("**You have to be in a voice channel to loop the queue.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send("**There is nothing playing.**");
        }

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