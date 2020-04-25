const { MessageEmbed } = require('discord.js')
const { aqua } = require('../../colours.json');
const { stripIndents } = require('common-tags');
const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const steamToken = process.env.STEAM;

module.exports = {
    run: async (client, message, args, owner) => {
        if(!args[0]) return message.channel.send('Enter an account to search for!');

        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamToken}&vanityurl=${args.join(' ')}`;

        fetch(url).then(results => results.json()).then(body => {
            if(body.response.success === 42) return message.channel.send('Unable to find a steam profile with that name!');

            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${steamToken}&steamids=${id}`;
            const state = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play'];

            fetch(summaries).then(results => results.json()).then(body => {
                if(!body.response) return message.channel.send('Unable to find a steam profile with that name!');

                const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

                fetch(bans).then(results => results.json()).then(body => {
                    if(!body.players) return message.channel.send('Unable to find a steam profile with that name!');

                    const { NumberOfVACBans, NumberOfGameBans } = body.players[0];

                    const embed = new MessageEmbed()
                        .setColor(aqua)
                        .setAuthor(`Steam | ${personaname}`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(stripIndents`**Real Name:** ${realname || 'Unknown'}
                        **Status:** ${state[personastate]}
                        **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : 'white'}:
                        **Account Created:** ${dateFormat(timecreated * 1000, 'd/mm/yyyy (h:MM:ss TT)')}
                        **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                        **Link:** [link to profile](${profileurl})`)
                        .setTimestamp()
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

                    message.channel.send(embed);
                })
            })
        })
    },
    config: {
        name: 'steam',
        description: 'Displays info about a steam account',
        usage: '!steam [user]',
        category: 'misc',
        accessableby: 'Members',
        aliases: []
    }
}