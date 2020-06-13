// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
  const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    //look for a channel called general, if that doesn't exist look for a channel called goog
    //have to add your channel names here
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'goog');
    //if the channel doesn't exist, do nothing
    if(!channel) return;

    //send a leave message
    channel.send(`cy@ ${member}`);
  }
}