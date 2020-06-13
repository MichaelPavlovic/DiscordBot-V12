const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { blue_dark } = require("../../../colours.json");

module.exports = class CreatorCommand extends BaseCommand {
  constructor() {
    super('creator', 'misc', ['owner'], 'creator');
  }

  run(client, message, args) {
    //create an embed with some info about the bot creator and send it to the channel
    const embed = new MessageEmbed()
      .setColor(blue_dark)
      .setThumbnail(message.guild.iconURL())
      .setTitle("Creator")
      .addField('Bot owner:', 'Michael')
      .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

    message.channel.send(embed);
  }
}