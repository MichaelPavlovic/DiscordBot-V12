const BaseCommand = require('../../utils/structures/BaseCommand');
const { Utils } = require("erela.js");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../../colours.json");

module.exports = class NowplayingCommand extends BaseCommand {
  constructor() {
    super('nowplaying', 'music', ['np'], 'nowplaying');
  }

  run(client, message, args) {
    //check if the user is in a voice channel
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("**You need to be in a voice channel!**");

    //check if there is music playing
    const player = client.music.players.get(message.guild.id);
    if(!player || !player.queue[0]) return message.channel.send("**There's no music playing.**");

    const { title, author, duration, uri, requester } = player.queue[0]; //get info from the current song

    //check if the user is in the same voice channel as the bot
    if(player.voiceChannel.id === channel.id){
      const embed = new MessageEmbed()
        .setColor(red_light)
        .setThumbnail(message.guild.iconURL())
        .setTitle(':musical_note: **Now Playing** :musical_note:')
        .setDescription(`[${title}](${uri}) by ${author}`)
        .addField('Duration', `${Utils.formatTime(duration, true)}`, true)
        .addField('Status', `${player.playing ? "▶️" : "⏸️"}`, true)
        .addField('Requested by', `${requester.username}`, true)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}