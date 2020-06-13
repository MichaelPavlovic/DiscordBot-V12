const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
const { green_light } = require("../../../colours.json");

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'misc', [], 'poll [question]');
  }

  run(client, message, args) {
    //check if the user sent an argument
    if(!args[0]) return message.channel.send('Enter a question for the poll!');
        
    //convert the entire message to one string
    let msg = args.slice(0).join(' ');

    //create a new embed with the string and send it to the channel
    let embed = new MessageEmbed()
      .setColor(green_light)
      .setTitle(`📋 ${msg}`)
      .setAuthor(`Poll created by: ${message.author.username}`, message.author.displayAvatarURL())
      .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
        
    message.delete(); //delete the command that the user typed

    //after the message is sent, react to it with the checkmark and x emojis
    message.channel.send(embed).then(messageReaction => {
      messageReaction.react('✅');
      messageReaction.react('❌');
    });
  }
}