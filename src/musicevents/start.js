const BaseEvent = require('../utils/structures/BaseEvent');
const { Utils } = require("erela.js");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = class TrackStartEvent extends BaseEvent {
  constructor() {
    super('trackStart');
  }
  
  async run(client, player, track) {
    const embed = new MessageEmbed()
      .setColor(red_light)
      .setTitle(':musical_note: **Now Playing** :musical_note:')
      .setDescription(`[${track.title}](${track.uri}) by ${track.author}`)
      .addField('Duration', `${Utils.formatTime(track.duration, true)}`, true)
      .addField('Requested by', `${track.requester.username}`, true)
      .setFooter(`© ${client.client.user.username}`, client.client.user.displayAvatarURL());
        
    player.textChannel.send(embed);
  }
}