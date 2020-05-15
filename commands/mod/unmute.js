const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("You don't have permission to unmute someone.");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to unmute.");
        } else {
            const unmuted = message.mentions.members.first();
            const unmuter = message.author.tag;
            const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

            if(unmuted) {
                if(unmuted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
                    message.channel.send("You can't unmute that person.");
                } else {
                    let mutedRole = message.guild.roles.cache.get('435186879407849482');
                    if(mutedRole) {
                        unmuted.roles.remove(mutedRole);

                        const embed = new MessageEmbed()
                            .setColor(purple_medium)
                            .setTitle(`Member unmuted by ${unmuter}`)
                            .addField('Unmuted Member', `${unmuted}`, true)
                            .addField('Server', `${message.guild.name}`, true)
                            .setTimestamp()
                            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                        channel.send(embed);
                    } else {
                        message.channel.send("Can't find the muted role.");
                    }
                }
            } else {
                message.channel.send("Member not found.");
            }
        }
    },
    config: {
        name: 'unmute',
        description: 'Unmutes a member',
        usage: '!unmute [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}