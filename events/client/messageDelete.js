const { MessageEmbed } = require('discord.js');
const { blue_light } = require("../../colours.json");

module.exports = async (client, message) => {
    if(!message.partial) {
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

        if(message.author.bot) return;
        
        if(channel){
            const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
            let user = "";

            if(entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)){
                user = entry.executor.username + '#' + entry.executor.discriminator;
            } else{ 
                user = message.author.username + '#' + message.author.discriminator;
            }

            const embed = new MessageEmbed()
                .setColor(blue_light)
                .setTitle('Deleted Message')
                .addField('Deleted by:', `${user} ** **`, true)
                .addField('Author', `${message.author.tag} (${message.author.id})`, true)
                .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content + '** **')
                .setTimestamp()
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            channel.send(embed);
        }
    }
}