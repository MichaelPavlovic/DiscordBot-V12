module.exports = {
    run: async(client, message, args, owner) => {
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send("You don't have permission to mute someone.");
        } else if(!args[0]){
            message.channel.send("You have to enter a user to mute.");
        } else {
            let member = message.mentions.members.first();
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
                    message.channel.send("You can't mute that person.");
                } else {
                    let mutedRole = message.guild.roles.cache.get('703041841846681631');
                    if(mutedRole) {
                        member.roles.add(mutedRole);
                        message.channel.send("User was muted.");
                    } else {
                        message.channel.send("Can't find the muted role.");
                    }
                }
            } else {
                message.channel.send("Member not found.");
            }
        }
    },
    config: {
        name: 'mute',
        description: 'Bans a member',
        usage: '!mute [user]',
        category: 'mod',
        accessableby: 'Moderators',
        aliases: []
    }
}