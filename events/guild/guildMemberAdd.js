module.exports = async (client, member) => {
    //look for a channel called general, if that doesn't exist look for a channel called goog
    //have to add your channel names here
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'goog');
    //if the channel doesn't exist, do nothing
    if(!channel) return;

    //welcome message
    channel.send(`Welcome to the server ${member}`);

    //add a role to the user when they join
    //have to add the role you want here
    //NOTE: it has to be lower than the bot's role
    member.roles.add(member.guild.roles.cache.find(role => role.name === "✓ᵛᵉʳᶦᶠᶦᵉᵈ")).catch(console.error);
}