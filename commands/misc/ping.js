//NOTE: Built based off of: https://github.com/MenuDocs/Discord.JS-v11.6.1-Tutorials/tree/Episode-16

module.exports = {
    run: async(client, message, args, owner) => {
        //send a message to the channel
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp; //calculate the ping of the bot

            //edit the message to the bot's ping and the ping to the API
            m.edit(`Bot latency: \`${ping}\`, API latency: \`${Math.round(client.ws.ping)}\``);
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