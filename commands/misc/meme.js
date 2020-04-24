const { MessageEmbed } = require("discord.js")
const { purple_light } = require("../../colours.json");
const randomPuppy = require('random-puppy');

module.exports = {
    run: async (client, message, args, owner) => {
      const subreddits = ['meme', 'meirl'];
      let rand = subreddits[Math.floor(Math.random() * subreddits.length)];
      
      let img = await randomPuppy(rand);
      
      let embed = new MessageEmbed()
        .setColor(purple_light)
        .setTitle(`From /r/${rand}`)
        .setURL(`https://reddit.com/r/${rand}`)
        .setImage(img)
        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
      
        message.channel.send(embed);
    },
    config: {
      name: 'meme',
      description: 'Gets a random meme from reddit',
      usage: '!meme',
      category: 'misc',
      accessableby: 'Members',
      aliases: ['meirl'],
  }
}