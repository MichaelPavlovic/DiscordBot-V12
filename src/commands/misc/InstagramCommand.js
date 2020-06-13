const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
const { pink } = require("../../../colours.json");
const { stripIndents } = require("common-tags");
const fetch = require('node-fetch');

module.exports = class InstagramCommand extends BaseCommand {
  constructor() {
    super('instagram', 'misc', ['ig', 'insta'], 'instagram [user]');
  }

  async run(client, message, args) {
    //get the name to search for
    let name = args[0];

    //if there is no name send a message to the channel
    if(!name) return message.channel.send('Enter a name to search for!');

    try {
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
        **Posts:** ${account.edge_owner_to_timeline_media.count}
        **Followers:** ${account.edge_followed_by.count}
        **Following:** ${account.edge_follow.count}
        **Private:** ${account.is_private ? 'Yes 🔐' : 'No 🔓'}`)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      message.channel.send(embed);
    } catch(err) { 
      console.log(err); 
    }
  }
}