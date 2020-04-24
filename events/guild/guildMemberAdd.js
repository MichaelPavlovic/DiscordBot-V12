module.exports = async (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'bot-spam');

    if(!channel) return;

    channel.send(`Welcome to the server ${member}`);
}