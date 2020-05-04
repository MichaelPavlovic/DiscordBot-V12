const { MessageEmbed } = require('discord.js');
const { orange } = require("../../colours.json");

module.exports = async (client, member) => {

    const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

    const embed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${invite.url}`)
            .setDescription(`${member.user.tag} joined using an invite link created by ${invite.inviter.tag}\nNumber of uses: ${invite.uses}`)
            .setTimestamp()
            .setFooter(`© ${client.user.tag}`, client.user.displayAvatarURL());

    if(channel){
        channel.send(embed).catch(err => console.log(err));
    }
}