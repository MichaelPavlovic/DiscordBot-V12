//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

//import
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel that the user is in
        const { channel } = message.member.voice;

        //if there is no channel return a message
        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the queue.**");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if there is no queue return a message to the channel
        if(!serverQueue){
            return message.channel.send("**The queue is empty.**");
        }

        //create an embed with all of the songs in the queue
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle('Music Queue')
            //create a new line for each song in the queue
            .setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ". " + `[${song.title}](${song.url})`).join("\n\n")}`,{ split: true })
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    },
    config: {
        name: 'queue',
        description: 'Displays the songs in the music queue',
        usage: '!queue',
        category: 'music',
        accessableby: 'Members',
        aliases: ['q', 'songs']
    }
}