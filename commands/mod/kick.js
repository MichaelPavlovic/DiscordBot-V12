const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("You do not have permission to kick someone!");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to kick.");
        } else if(!args[1]){
            message.channel.send("Enter a kick reason.");
        } else {
            try {
                const kicked = await message.mentions.members.first();
                const kicker = message.author.tag;
                const reason = args[1];
                const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

                if(!message.guild.member(kicked).kickable) return message.channel.send("That user is not kickable.");

                kicked.kick();
                
                if(kicked){
                    const embed = new MessageEmbed()
                        .setColor(purple_medium)
                        .setTitle(`Member kicked by ${kicker}`)
                        .addField('Kicked Member', `${kicked}`, true)
                        .addField('Server', `${message.guild.name}`, true)
                        .setDescription(`**Reason:** ${reason}`)
                        .setTimestamp()
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                    channel.send(embed);
                }
            } catch(e) {
                console.error(e);
            }
        }
    },
    config: {
        name: 'kick',
        description: 'Kicks a member',
        usage: '!kick [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}