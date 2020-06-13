const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
  constructor() {
    super('leave', 'music', ['stop', 'end'], 'stop');
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
      client.music.players.destroy(message.guild.id); //destroy the music player
      return message.channel.send('**Leaving** :stop_button:');
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}