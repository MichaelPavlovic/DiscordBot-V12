//import
const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //check if the member running the ban command has the permission to ban members
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("You do not have permission to ban someone!");
        } else if(!args[0]){
            //check if there was no first argument
            message.channel.send("You have to enter a user to ban.");
        } else if(!args[1]){
            //check if there was no second argument
            message.channel.send("Enter a ban reason.");
        } else {
            //attempt to ban the user
            try {
                const banned = await message.mentions.members.first(); //get the first member that was mentioned
                const banner = message.author.tag; //get the user that sent the command
                const reason = args[1]; //get the second argument
                const channel = client.channels.cache.find(channel => channel.name === "mod-logs"); //attempt to find the channel called mod-logs

                //if the banned user exists
                if(banned){
                    //if the user is not bannable return a message to the channel
                    if(!message.guild.member(banned).bannable) return message.channel.send("That user is not bannable.");

                    await banned.ban(); //ban the user

                    //create an embed with the ban info and send it to the mod-logs channel
                    const embed = new MessageEmbed()
                        .setColor(purple_medium)
                        .setTitle(`Member banned by ${banner}`)
                        .addField('Banned Member', `${banned}`, true)
                        .addField('Server', `${message.guild.name}`, true)
                        .setDescription(`**Reason:** ${reason}`)
                        .setTimestamp()
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                    channel.send(embed);
                } else{
                    message.channel.send("Member not found.");
                }
            } catch(e) {
                console.error(e); //log any errors in the console
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