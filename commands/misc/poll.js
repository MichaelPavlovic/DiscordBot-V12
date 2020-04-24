const { MessageEmbed } = require("discord.js")
const { green_light } = require("../../colours.json");

module.exports = {
    run: async (client, message, args, owner) => {
        if(!args[0]) return message.channel.send('Enter a question for the poll!');
        
        let msg = args.slice(0).join(' ');

        let embed = new MessageEmbed()
            .setColor(green_light)
            .setTitle(`📋 ${msg}`)
            .setAuthor(`Poll created by: ${message.author.username}`, message.author.displayAvatarURL())
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
        message.delete();

        message.channel.send(embed).then(messageReaction => {
            messageReaction.react('✅');
            messageReaction.react('❌');
        });
    },
    config: {
        name: 'poll',
        description: 'Creates a simple yes/no poll',
        usage: '!poll [question]',
        category: 'misc',
        accessableby: 'Members',
        aliases: []
    }
}