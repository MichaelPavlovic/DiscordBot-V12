//import
const { MessageEmbed } = require('discord.js');
const { blue_dark } = require("../../colours.json");

module.exports = async (client, message) => {
    //check if the message is a partial
    if(!message.partial) {
        const channel = client.channels.cache.find(channel => channel.name === "mod-logs"); //attempt to find the channel called mod-logs

        //ignore the message if it was deleted by a bot, to avoid weird behaviour
        if(message.author.bot) return;
        
        //if the channel exists
        if(channel){
            //find the user that deleted the message from the audit logs
            const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
            let user = "";

            if(entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)){
                user = entry.executor.username + '#' + entry.executor.discriminator;
            } else{ 
                user = message.author.username + '#' + message.author.discriminator;
            }

            //create an embed with the deleted message info
            const embed = new MessageEmbed()
                .setColor(blue_dark)
                .setTitle(`Message Deleted by ${user}`)
                .addField('Author', `${message.author}`, true)
                .addField('Server', `${message.guild.name}`, true)
                .addField('Channel', `${message.channel.name}`, true)
                .setDescription(`${message.content} ** **`)
                .setTimestamp()
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            channel.send(embed);
        }
    }
}