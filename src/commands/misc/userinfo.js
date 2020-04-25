const { MessageEmbed } = require("discord.js")
const { white } = require("../../colours.json");

module.exports = {
    run: async (client, message, args, owner) => {
        //console.log(args);

        if(args.length > 1) return message.channel.send('Only mention 1 member');

        if(args.length === 1){
            const member = message.mentions.members.size === 1 ? message.mentions.members.first() : message.guild.members.cache.get(args[1]);
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
                message.channel.send(`Could not find that member`);
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