const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'misc', ['lag', 'latency'], 'ping');
  }

  run(client, message, args) {
    //send a message to the channel
    message.channel.send("Pinging...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp; //calculate the ping of the bot

      //edit the message to the bot's ping and the ping to the API
      m.edit(`Bot latency: \`${ping}\`, API latency: \`${Math.round(client.ws.ping)}\``);
    });
  }
}