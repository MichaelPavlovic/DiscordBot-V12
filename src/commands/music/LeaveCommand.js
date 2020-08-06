const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
  constructor() {
    super('leave', 'music', ['stop', 'end'], 'stop');
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
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      return message.channel.send('**Leaving** :stop_button:');
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}