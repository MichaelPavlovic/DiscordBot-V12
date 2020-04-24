module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("You do not have permission to kick someone!");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to kick.");
        } else {
            try {
                let kicked = await message.mentions.members.first();

                await kicked.kick();
                if(kicked) console.log(kicked.user.tag + " was kicked.");
            } catch(e) {
                console.error(e);
            }
        }
    },
    config: {
        name: 'kick',
        description: 'Kicks a member',
        usage: '!kick [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}