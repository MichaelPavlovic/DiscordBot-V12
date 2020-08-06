const BaseCommand = require('../../utils/structures/BaseCommand');
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

    const serverQueue = message.client.queue.get(message.guild.id);
    //check if there is music playing
    if(!serverQueue) return message.channel.send("**There's no music playing.**");

    //check if the user is in the same voice channel as the bot
    if(serverQueue.channel.id === channel.id){
      const embed = new MessageEmbed()
        .setColor(red_light)
        .setThumbnail(serverQueue.songs[0].thumbnail)
        .setTitle(':musical_note: **Now Playing** :musical_note:')
        .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) by ${serverQueue.songs[0].author}`)
        .addField('Duration', `${serverQueue.songs[0].duration}`, true)
        .addField('Status', `${serverQueue.playing ? "▶️" : "⏸️"}`, true)
        .addField('Requested by', `${serverQueue.songs[0].requester}`, true)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}