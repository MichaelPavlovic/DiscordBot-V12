module.exports = {
    run: async(client, message, args, owner) => {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let choices = ["Is this really my ping", "Is it okay? I can't look", "I hope it isn't bad"];
            let response = choices[Math.floor(Math.random() * choices.length)];

            m.edit(`${response}: Bot latency: \`${ping}\`, API latency: \`${Math.round(client.ping)}\``);
        });
    },
    config: {
        name: 'ping',
        description: 'Checks bot latency',
        usage: '!ping',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['lag', 'latency']
    }
}