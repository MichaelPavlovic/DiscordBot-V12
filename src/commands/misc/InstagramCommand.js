const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
const { pink } = require("../../../colours.json");
const { stripIndents } = require("common-tags");
const insta = require("user-instagram");

module.exports = class InstagramCommand extends BaseCommand {
  constructor() {
    super('instagram', 'misc', ['ig', 'insta'], 'instagram [user]');
  }

  async run(client, message, args) {
    //get the name to search for
    let name = args[0];

    //if there is no name send a message to the channel
    if(!name) return message.channel.send('Enter an account to search for!');

    await insta(name).then(res => {

      //create a new embed with the result info and send it to the channel
      let embed = new MessageEmbed()
        .setColor(pink)
        .setTitle(res.fullName)
        .setURL(res.link)
        .setThumbnail(res.profilePicHD)
        .addField('Profile info:', stripIndents`**Username:** ${res.username}
        **Full name:** ${res.fullName}
        **Biography:** ${res.biography.length == 0 ? 'None' : res.biography}
        **Posts:** ${res.postsCount}
        **Followers:** ${res.subscribersCount}
        **Following:** ${res.subscribtions}
        **Private:** ${res.isPrivate ? 'Yes 🔐' : 'No 🔓'}`)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

      message.channel.send(embed);
    }).catch(err => {
      console.log(err);
      return message.reply("Are you sure that account exists?");
    });
  }
}