const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("You don't have permission to mute someone.");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to mute.");
        } else if(!args[1]){
            message.channel.send("Enter a mute reason.");
        } else {
            const muted = message.mentions.members.first();
            const muter = message.author.tag;
            const reason = args[1];
            const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

            if(muted) {
                if(muted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
                    message.channel.send("You can't mute that person.");
                } else {
                    let mutedRole = message.guild.roles.cache.get('435186879407849482');
                    if(mutedRole) {
                        muted.roles.add(mutedRole);

                        const embed = new MessageEmbed()
                            .setColor(purple_medium)
                            .setTitle(`Member muted by ${muter}`)
                            .addField('Muted Member', `${muted}`, true)
                            .addField('Server', `${message.guild.name}`, true)
                            .setDescription(`**Reason:** ${reason}`)
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
        name: 'mute',
        description: 'Mutes a member',
        usage: '!mute [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}