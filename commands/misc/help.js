//NOTE: Build the help command based off of: https://github.com/MenuDocs/Discord.JS-v11.6.1-Tutorials/tree/Episode-21

//import
const { MessageEmbed } = require('discord.js');
const PREFIX = process.env.PREFIX;
const { readdirSync } = require('fs');
const { stripIndents } = require("common-tags");
const { cyan } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //create an embed
        const help = new MessageEmbed()
            .setColor(cyan)
            .setAuthor('Help', message.guild.iconURL)
            .setThumbnail(client.user.displayAvatarURL())

        //check if there is an argument
        if(!args[0]){
            //get the sub folders from the commands folder
            const categories = readdirSync('./commands/');

            help.setDescription(`Avaliable commands for ${message.guild.me.displayName}\nPrefix: **${PREFIX}**`);
            help.setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            //loop through the sub folders
            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category);
                const cap = category.slice(0, 1).toUpperCase() + category.slice(1); //make the first letter of the category uppercase
                
                //add a new field with the name of the command
                try{
                    help.addField(`**${cap} [${dir.size}]:**`, dir.map(c => `\`${c.config.name}\``).join(" "));
                } catch(e){
                    console.log(e);
                }
            });

            return message.channel.send(help);
        } else{
            //get the command based off of the name entered or the alias entered
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
          
            //if the command doesn't exist send a message to the channel
            if(!command){
                return message.channel.send(help.setTitle("Invalid command.").setDescription(`Use \`${PREFIX}help\` for a list of commands!`));
            }

            //get the command config
            command = command.config;

            //set description of the embed
            help.setDescription(stripIndents`The prefix is: \`${PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No description provided."}
            **Usage:** ${command.usage ? `\`${command.usage}\`` : "No usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`);

            return message.channel.send(help);
        }
    },
    config: {
        name: 'help',
        description: 'Displays bot commands',
        usage: '!help',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['h', 'commands']
    }
}