const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../../colours.json");

module.exports = class QueueCommand extends BaseCommand {
  constructor() {
    super('queue', 'music', ['q'], 'queue');
  }

  run(client, message, args) {
    //check if the user is in a voice channel
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("**You need to be in a voice channel!**");

    //check if there is music playing
    const player = client.music.players.get(message.guild.id);
    if(!player || !player.queue[0]) return message.channel.send("**There's no music playing.**");

    //check if the user is in the same voice channel as the bot
    if(player.voiceChannel.id === channel.id){
      let i = 2;
      let string = "";

      //separate the current song from the rest of the queue for a nicely formated embed
      if(player.queue[0]) string += `__**Currently Playing**__\n [${player.queue[0].title}](${player.queue[0].uri}) - Requested by ${player.queue[0].requester.username}. \n`;
      if(player.queue[1]) string += `__**Queue**__\n ${player.queue.slice(1, 10).map(x => `${i++}) [${x.title}](${x.uri}) - Requested by ${x.requester.username}.`).join("\n")}`;

      const embed = new MessageEmbed()
        .setColor(red_light)
        .setTitle(`Queue for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(string)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}