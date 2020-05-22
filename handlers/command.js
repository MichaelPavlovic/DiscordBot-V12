//import
const { readdirSync } = require('fs');

module.exports = (client) => {
    //loops through all of the commands in the sub directories of the commands folder
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
        };
    };
    //this array contains the names of the sub folders
    //have to add them here if you create new sub folders or it will throw an error
    ['misc', 'mod', 'music', 'owner'].forEach(x => load(x));
}