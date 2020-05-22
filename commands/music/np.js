//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

//import
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //get the voice channel the user is in
        const { channel } = message.member.voice;

        //if they are not in a voice channel return a message
        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the current song.** :x:");
        }

        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);

        //if there is no queue return a message 
        if(!serverQueue){
            return message.channel.send("**Nothing playing.**");
        }
        
        //create an embed with info of the song that is currently playing
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle(':musical_note: **Now Playing** :musical_note:')
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