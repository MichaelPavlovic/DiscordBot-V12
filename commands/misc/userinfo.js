//import
const { MessageEmbed } = require("discord.js")
const { white } = require("../../colours.json");

module.exports = {
    run: async (client, message, args, owner) => {
        //check if more than 1 user is mentioned
        if(args.length > 1) return message.channel.send('Only mention one user!');
        
        //check if there is no arguments
        if(!args[0]) return message.channel.send('Mention someone!');

        //check if there is 1 argument
        if(args[0]){
            //get the first user mentioned
            let member = message.mentions.members.first();

            //if the member exists create an embed with info about that user and send it to the channel
            if(member) {
                let embed = new MessageEmbed()
                    .setColor(white)
                    .setTitle("User Info")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
                    .addField("**Username:**", `${member.user.username}`, true)
                    .addField("**Discriminator:**", `${member.user.discriminator}`, true)
                    .addField("**ID:**", `${member.user.id}`, true)
                    .addField("**Status:**", `${member.user.presence.status}`, true)
                    .addField("**Joined On:**", `${member.joinedAt.toLocaleString()}`, true)
                    .addField("**Created On:**", `${member.user.createdAt.toLocaleString()}`, true)
                    .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
                    .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                message.channel.send(embed);
            } else {
                message.channel.send(`Could not find that member`); //send a message to the channel if the user doesn't exist
            }
        }
    },
    config: {
        name: 'userinfo',
        description: 'Displays info about a user',
        usage: '!userinfo [user] | !userinfo',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['user', 'stats', 'info']
    }
}