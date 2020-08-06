const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PauseCommand extends BaseCommand {
  constructor() {
    super('pause', 'music', ['resume', 'unpause'], 'pause');
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
      //pause or resume the queue
      if(serverQueue.playing){
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return message.channel.send(`**Paused :pause_button:**`);
      } else {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send(`**Resumed :play_pause:**`);
      }
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}