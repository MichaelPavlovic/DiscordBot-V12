const PREFIX = process.env.PREFIX; //get the prefix from the .env
const owner = process.env.OWNERID; //get the owner id from the .env

module.exports = async (client, message) => {
    if(message.author.bot || message.channel.type === "dm") return; //if the message is sent by a bot or channel type is dm return

    //for fun inside joke stuff
    if(message.content.startsWith('🤠')){
        message.channel.send(':cowboy:');
    }
    if(message.content.match(/creeper/i)){
        message.channel.send('AWW MAN');
    }
    if(message.content.match(/stop cry/i)){
        message.channel.send('stop cry :rage:');
    }
    if(message.content.startsWith('cool')){
        message.channel.send('cool');
    }
    if(message.content.startsWith('wah')){
        message.channel.send('wah wah wah');
    }

    if(!message.content.startsWith(PREFIX)) return; //if the message does not start with the prefix return

    //separates the arguments to get the command name
    let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    //get the command name and aliases
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    //if the command exists run it and pass in the following parameters
    if(commandFile){        
        commandFile.run(client, message, args, owner);
    }
}