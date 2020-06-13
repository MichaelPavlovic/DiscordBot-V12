const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return; //ignore bot messages
    //memes
    if(message.content.startsWith('🤠')){
      message.channel.send(':cowboy:');
    }
    if(message.content.match(/creeper/i)){
        message.channel.send('AWW MAN');
    }
    if(message.content.match(/stop cry/i)){
        message.channel.send('stop cry :rage:');
    }
    if(message.content.startsWith('cool')){
        message.channel.send('cool');
    }
    if(message.content.startsWith('wah')){
        message.channel.send('wah wah wah');
    }
    if (message.content.startsWith(client.prefix)) {
      //separates the arguments to get the command name
      let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase();
      const command = client.commands.get(cmd);
      if (command) {
        command.run(client, message, args);
      }
    }
  }
}