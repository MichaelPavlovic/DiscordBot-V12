const { MessageEmbed } = require('discord.js');
const { blue_dark } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        const embed = new MessageEmbed()
        .setColor(blue_dark)
        .setThumbnail(message.guild.iconURL())
        .setTitle("Creator")
        .addField('Bot owner:', 'Michael')
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    },
    config: {
        name: 'creator',
        description: 'Displays the bot owner',
        usage: '!creator',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['owner']
    }
}