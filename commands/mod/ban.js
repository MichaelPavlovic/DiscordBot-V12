module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("You do not have permission to ban someone!");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to ban.");
        } else {
            try {
                let banned = message.mentions.members.first();
                await banned.ban();
                if(banned) console.log(banned.user.tag + " was banned.");
            } catch(e) {
                console.error(e);
            }
        }
    },
    config: {
        name: 'ban',
        description: 'Bans a member',
        usage: '!ban [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}