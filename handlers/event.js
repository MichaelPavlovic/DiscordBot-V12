//import
const { readdirSync } = require('fs');

module.exports = (client) => {
    //loops through all of the events in the sub directories of the events folder
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(file => file.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
        };
    };
    //this array contains the names of the sub folders
    //have to add them here if you create new sub folders or it will throw an error
    ['client', 'guild'].forEach(x => load(x));
}