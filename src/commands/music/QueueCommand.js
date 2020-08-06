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

    const serverQueue = message.client.queue.get(message.guild.id);
    //check if there is music playing
    if(!serverQueue) return message.channel.send("**There's no music playing.**");

    //check if the user is in the same voice channel as the bot
    if(serverQueue.channel.id === channel.id){
      let i = 2;
      let string = "";

      //separate the current song from the rest of the queue for a nicely formated embed
      if(serverQueue.songs[0]) string += `__**Currently Playing**__\n [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) - Requested by ${serverQueue.songs[0].requester}. \n`;
      if(serverQueue.songs[1]) string += `__**Queue**__\n ${serverQueue.songs.slice(1, 10).map(x => `${i++}) [${x.title}](${x.url}) - Requested by ${x.requester}.`).join("\n")}`;

      const embed = new MessageEmbed()
        .setColor(red_light)
        .setAuthor(`Queue for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(string)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}