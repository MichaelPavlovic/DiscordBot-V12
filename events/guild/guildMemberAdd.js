module.exports = async (client, member) => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general' || ch.name === 'goog');
    if(!channel) return;

    //welcome message
    channel.send(`Welcome to the server ${member}`);

    //add a role to the user when they join
    member.roles.add(member.guild.roles.cache.find(role => role.name === "✓ᵛᵉʳᶦᶠᶦᵉᵈ")).catch(console.error);
}