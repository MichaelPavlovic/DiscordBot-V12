const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const { aqua } = require('../../../colours.json');
const { stripIndents } = require('common-tags');
const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const steamToken = process.env.STEAM; //get steam api key from the .env

module.exports = class SteamCommand extends BaseCommand {
  constructor() {
    super('steam', 'misc', [], 'steam [user]');
  }

  run(client, message, args) {
    //check if there is an account name to search for
    if(!args[0]) return message.channel.send('Enter an account to search for!');

    //set the url and append the argument to it
    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamToken}&vanityurl=${args.join(' ')}`;

    //attempt to search for that user
    fetch(url).then(results => results.json()).then(body => {
      //if the user is not found send a message to the channel
      if(body.response.success === 42) return message.channel.send('Unable to find a steam profile with that name!');

      const id = body.response.steamid; //get the id of the user
      const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${id}`; //set thr url for summaries of the user by id
      const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${steamToken}&steamids=${id}`; //set the url for bans of the user by id
      const state = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play']; //array of user statuses

      //attempt to get summaries
      fetch(summaries).then(results => results.json()).then(body => {
        //if the user is not found send a message to the channel
        if(!body.response) return message.channel.send('Unable to find a steam profile with that name!');

        //get user info of the first result
        const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        //attempt to get bans for the user
        fetch(bans).then(results => results.json()).then(body => {
          //if the user is not found send a message to the channel
          if(!body.players) return message.channel.send('Unable to find a steam profile with that name!');

          //get ban info
          const { NumberOfVACBans, NumberOfGameBans } = body.players[0];

          //create an embed with information about the steam account and send it to the channel
          const embed = new MessageEmbed()
            .setColor(aqua)
            .setAuthor(`Steam | ${personaname}`, avatarfull)
            .setThumbnail(avatarfull)
            //set the name to unknown if a name isn't found
            .setDescription(stripIndents`**Real Name:** ${realname || 'Unknown'}
            **Status:** ${state[personastate]}
            **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : 'white'}:
            **Account Created:** ${dateFormat(timecreated * 1000, 'd/mm/yyyy (h:MM:ss TT)')}
            **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
            **Link:** [link to profile](${profileurl})`) //hyperlink syntax for embeds
            .setTimestamp()
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(embed);
        });
      });
    });
  }
}