const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the current song.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**Nothing playing.**");
        }
        
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle(':musical_note: **Now Playing**')
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
            .addField('Duration', `${serverQueue.songs[0].duration}`, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    },
    config: {
        name: 'np',
        description: 'Displays the current song',
        usage: '!np',
        category: 'music',
        accessableby: 'Members',
        aliases: ['nowplaying', 'now', 'current', 'song']
    }
}