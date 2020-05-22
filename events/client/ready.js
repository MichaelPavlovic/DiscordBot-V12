const PREFIX = process.env.PREFIX;

module.exports = (client) => {
    console.log(client.user.tag + ' is online!'); //logs a message to the console when the bot is online

    //client.user.setActivity("my development!", { type: 'WATCHING'}).catch(console.error);

    //cycle through the activities on a set interval
    let activities = [ `${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.users.cache.size} users!` ], i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]} | !help`, { type: "WATCHING" }), 15000);
}