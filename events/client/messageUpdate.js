//import
const { MessageEmbed } = require('discord.js');
const { green_light } = require("../../colours.json");

module.exports = async (client, oldMessage, newMessage) => {
    //check if the message is a partial
    if(!oldMessage.partial) {
        //look for the channel called mod-logs
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

        //ignore bot messages to avoid weird behaviour
        if(oldMessage.author.bot) return;

        //if the channel exists
        if(channel){
            //create an embed with the edited message info
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