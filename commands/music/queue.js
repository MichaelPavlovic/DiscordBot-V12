const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

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

        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle('Music Queue')
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