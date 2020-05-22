//import
const { MessageEmbed } = require("discord.js")
const { pink } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args, owner) => {
        //get the name to search for
        let name = args[0];

        //if there is no name send a message to the channel
        if(!name) return message.channel.send('Enter a name to search for!');

        //set the url with the name to search for
        let url = `https://instagram.com/${name}/?__a=1`;
        //attempt to search for the account
        let result = await fetch(url).then(url => url.json());

        //if no account is found send a message to the channel
        if(!result.graphql.user.username) return message.channel.send('Could not find that account. Try another account!');

        //get the result info of the user
        let account = result.graphql.user;

        //create a new embed with the result info and send it to the channel
        let embed = new MessageEmbed()
            .setColor(pink)
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${account.username}/`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField('Profile information:', stripIndents`**Username:** ${account.username}
            **Full name:** ${account.full_name}
            **Biography:** ${account.biography.length == 0 ? 'None' : account.biography}
            **Followers:** ${account.edge_owner_to_timeline_media.count}
            **Following:** ${account.edge_follow.count}
            **Private:** ${account.is_private ? 'Yes 🔐' : 'No 🔓'}`)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    },
    config: {
        name: 'instagram',
        description: 'Displays info about an instagram account',
        usage: '!instagram [user]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['ig', 'insta']
    }
}