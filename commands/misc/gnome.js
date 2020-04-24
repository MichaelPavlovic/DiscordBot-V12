module.exports = {
    run: async(client, message, args, owner) => {
        if(!args[0]) return message.reply('Enter a user to gnome!');

        message.delete();
        
        let user = message.mentions.users.first();
        message.channel.send(`${user} Ho ho ho ha ha, ho ho ho he ha. Hello there, old chum. I’m g'not a g'nelf. I’m g'not a g'noblin. I’m a g'nome!! And you’ve been, GNOOOMED!!!`);
    },
    config: {
        name: 'gnome',
        description: 'Meme command',
        usage: '!gnome [user]',
        category: 'misc',
        accessableby: 'Members',
        aliases: []
    }
}