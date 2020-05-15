const { MessageEmbed } = require('discord.js');
const { green_light } = require("../../colours.json");

module.exports = async (client, oldMessage, newMessage) => {
    if(!oldMessage.partial) {
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

        if(oldMessage.author.bot) return;

        if(channel){
            const embed = new MessageEmbed()
                .setColor(green_light)
                .setTitle(`Message Edited by ${oldMessage.author.tag}`)
                .addField('Server', `${oldMessage.guild.name}`, true)
                .addField('Channel', `${oldMessage.channel.name}`, true)
                .setDescription(`**Old Message:** ${oldMessage.content} \n **New Message:** ${newMessage.content}`)
                .setTimestamp()
                .setFooter(`© ${oldMessage.guild.me.displayName}`, client.user.displayAvatarURL());

            channel.send(embed);
        }
    }
}