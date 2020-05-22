//import
const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user trying to run the command has permissions to kick and ban members
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("You don't have permission to mute someone.");
        } else if(!args[0]){
            //check if there was a first arg
            message.channel.send("You have to enter a user to mute.");
        } else if(!args[1]){
            //check if there was a second arg
            message.channel.send("Enter a mute reason.");
        } else {
            try{
                const muted = message.mentions.members.first(); //get the first member mentioned
                const muter = message.author.tag; //get the user that send the command
                const reason = args[1]; //get the second arg
                const channel = client.channels.cache.find(channel => channel.name === "mod-logs"); //look for the channel called mod-logs

                //if the muted user exists
                if(muted) {
                    //check if the user about to me muted has kick and ban permissions, and if the message author has admin permissions
                    if(muted.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
                        message.channel.send("You can't mute that person.");
                    } else {
                        //have to create a custom muted role and add the id here
                        let mutedRole = message.guild.roles.cache.get('435186879407849482'); //look for the role with this id

                        //if the role exists
                        if(mutedRole) {
                            muted.roles.add(mutedRole); //add the role to the user

                            //create an embed with the mute info and send it to the mod-logs channel
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
            } catch(e) {
                console.error(e); //log any errors in he console
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