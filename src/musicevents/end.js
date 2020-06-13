const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class QueueEndEvent extends BaseEvent {
  constructor() {
    super('queueEnd');
  }
  
  async run(client, player) {
    player.textChannel.send("Queue has ended.");
    client.players.destroy(player.guild.id);
  }
}