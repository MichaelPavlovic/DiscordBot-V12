module.exports = async (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'goog');

    if(!channel) return;

    channel.send(`cy@ ${member}`);
}