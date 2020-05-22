//import
const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user trying to run the command has permissions to kick users
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("You do not have permission to kick someone!");
        } else if(!args[0]){
            //check if there was a first argument
            message.channel.send("You have to enter a user to kick.");
        } else if(!args[1]){
            //check if there was a second argument
            message.channel.send("Enter a kick reason.");
        } else {
            //attempt to kick the user
            try {
                const kicked = await message.mentions.members.first(); //get the first user mentioned
                const kicker = message.author.tag; //get the user that sent the command
                const reason = args[1]; //get the second argument
                const channel = client.channels.cache.find(channel => channel.name === "mod-logs"); //look for the channel called mod-logs
                
                //if the user was kicked
                if(kicked){
                    //check if the user is kickable
                    if(!message.guild.member(kicked).kickable) return message.channel.send("That user is not kickable.");

                    //attempt to kick the user
                    kicked.kick();

                    //create a new embed with the kick info
                    const embed = new MessageEmbed()
                        .setColor(purple_medium)
                        .setTitle(`Member kicked by ${kicker}`)
                        .addField('Kicked Member', `${kicked}`, true)
                        .addField('Server', `${message.guild.name}`, true)
                        .setDescription(`**Reason:** ${reason}`)
                        .setTimestamp()
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                    channel.send(embed);
                } else{
                    message.channel.send("Member not found.");
                }
            } catch(e) {
                console.error(e); //log any errors in he console
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