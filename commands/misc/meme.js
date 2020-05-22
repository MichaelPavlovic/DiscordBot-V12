//import
const { MessageEmbed } = require("discord.js")
const { purple_dark } = require("../../colours.json");
const randomPuppy = require('random-puppy');

module.exports = {
    run: async (client, message, args, owner) => {
      //create an array with the subreddits you want to include
      const subreddits = ['meme', 'meirl'];

      //select a random subreddit from the array based on the length of the array
      let rand = subreddits[Math.floor(Math.random() * subreddits.length)];
      
      //get a post from the subreddit
      let img = await randomPuppy(rand);
      
      //create an embed with the post and send it to the channel
      let embed = new MessageEmbed()
        .setColor(purple_dark)
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