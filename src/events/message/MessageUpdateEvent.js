// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { green_light } = require("../../../colours.json");

module.exports = class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }
  
  async run(client, oldMessage, newMessage) {
    //look for the channel called mod-logs
    const channel = client.channels.cache.find(channel => channel.name === "mod-logs");

    //ignore bot messages to avoid weird behaviour
    if(oldMessage.author.bot) return;

    //check if the 2 messages are the same
    if(oldMessage === newMessage) return;

    //if the channel exists
    if(channel){
      //create an embed with the edited message info
      const embed = new MessageEmbed()
        .setColor(green_light)
        .setTitle(`Message Edited by ${oldMessage.author.tag}`)
        .addField('Server', `${oldMessage.guild.name}`, true)
        .addField('Channel', `<#${oldMessage.channel.id}>`, true)
        .addField('Link', `[Jump to message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
        .setDescription(`**Old Message:** ${oldMessage.content} \n **New Message:** ${newMessage.content}`)
        .setTimestamp()
        .setFooter(`© ${oldMessage.guild.me.displayName}`, client.user.displayAvatarURL());

      channel.send(embed);
    }
  }
}