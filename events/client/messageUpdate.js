const { MessageEmbed } = require('discord.js');
const { green_light } = require("../../colours.json");

module.exports = async (client, oldMessage, newMessage) => {
    if(!oldMessage.partial) {
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

        if(oldMessage.author.bot) return;

        if(channel){
            const embed = new MessageEmbed()
                .setColor(green_light)
                .setTitle('Edited Message')
                .addField('Author', `${oldMessage.author.tag} (${oldMessage.author.id})`, true)
                .addField('Channel', `${oldMessage.channel.name} (${oldMessage.channel.id})`, true)
                .addField('Old Message', `${oldMessage.content} ** **`, true)
                .addField('New Message', `${newMessage.content} ** **`, true)
                .setTimestamp()
                .setFooter(`© ${oldMessage.guild.me.displayName}`, client.user.displayAvatarURL());

            channel.send(embed);
        }
    }
}