const { MessageEmbed } = require('discord.js');
const { blue_light } = require("../../colours.json");

module.exports = async (client, message) => {
    if(!message.partial) {
        const channel = client.channels.cache.get('703031267922280559');
        if(channel) {
            const embed = new MessageEmbed()
                .setColor(blue_light)
                .setTitle('Deleted Message')
                .addField('Author', `${message.author.tag} (${message.author.id})`, true)
                .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp()
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            channel.send(embed);
        }
    }
}