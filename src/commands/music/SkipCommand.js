const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'music', ['s', 'next'], 'skip');
  }

  run(client, message, args) {
    //check if the user is in a voice channel
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("**You need to be in a voice channel!**");

    //check if there is music playing
    const player = client.music.players.get(message.guild.id);
    if(!player) return message.channel.send("**There's no music playing.**");

    //check if the user is in the same voice channel as the bot
    if(player.voiceChannel.id === channel.id){
      player.stop(); //stop the current song so the next one starts
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}