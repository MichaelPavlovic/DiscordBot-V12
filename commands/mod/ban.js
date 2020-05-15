const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("You do not have permission to ban someone!");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to ban.");
        } else if(!args[1]){
            message.channel.send("Enter a ban reason.");
        } else {
            try {
                const banned = await message.mentions.members.first();
                const banner = message.author.tag;
                const reason = args[1];
                const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

                if(!message.guild.member(banned).bannable) return message.channel.send("That user is not bannable.");

                await banned.ban();

                if(banned){
                    const embed = new MessageEmbed()
                        .setColor(purple_medium)
                        .setTitle(`Member banned by ${banner}`)
                        .addField('Banned Member', `${banned}`, true)
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
        name: 'ban',
        description: 'Bans a member',
        usage: '!ban [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}