const { MessageEmbed } = require('discord.js');
const PREFIX = process.env.PREFIX;
const { readdirSync } = require('fs');
const { stripIndents } = require("common-tags");
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: 'help',
        description: 'Displays bot commands',
        usage: '!help',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['h', 'commands']
    },
    run: async(client, message, args, owner) => {
        const help = new MessageEmbed()
            .setColor(cyan)
            .setAuthor('Help', message.guild.iconURL)
            .setThumbnail(client.user.displayAvatarURL())

        if(!args[0]){
            const categories = readdirSync('./commands/');

            help.setDescription(`Avaliable commands for ${message.guild.me.displayName}\nPrefix: **${PREFIX}**`);
            help.setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category);
                const cap = category.slice(0, 1).toUpperCase() + category.slice(1);
                
                try{
                    help.addField(`> ${cap} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "));
                } catch(e){
                    console.log(e);
                }
            });

            message.delete();

            return message.channel.send(help);
        } else{
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
          
            if(!command){
                message.delete();
                
                return message.channel.send(help.setTitle("Invalid command.").setDescription(`Use \`${PREFIX}help\` for a list of commands!`));
            }

            command = command.config;

            help.setDescription(stripIndents`The prefix is: \`${PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No description provided."}
            **Usage:** ${command.usage ? `\`${command.usage}\`` : "No usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`);

            message.delete();

            return message.channel.send(help);
        }
    }
}