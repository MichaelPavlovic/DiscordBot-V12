const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RemoveCommand extends BaseCommand {
  constructor() {
    super('remove', 'music', ['queueremove', 'qr'], 'remove [number]');
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
      //get the first argument
      let arg = args[0];
      //check if it is less than 1 because there would be at least 1 song in the queue so the number should be at least 1
      //check if the argument is greater than the length of the queue
      //check if the argument is not a number
      //check if the argument is an integer
      if(arg < 1 || arg >= serverQueue.songs.length + 1 || isNaN(arg) || !Number.isInteger(+arg)){
        return message.channel.send("**Enter a valid song number**"); //return error message if it's not valid
      }

      //remove the selected song from the queue
      serverQueue.songs.splice(arg - 1, 1);

      message.channel.send(`**Song ${arg} was removed from the queue**`);
    } else {
      message.channel.send("**You have to be in the same voice channel as the bot.**");
    }
  }
}