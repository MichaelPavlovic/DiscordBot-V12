const BaseCommand = require('../../utils/structures/BaseCommand');
const { Utils } = require("erela.js");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../../colours.json");

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', ['p'], 'play [url] | [song]');
  }

  run(client, message, args) {
    //check if the user is in a voice channel
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("**You need to join a voice channel to play a song!**");

    //check if the bot has perms to connect & speak in the voice channel
    const permissions = channel.permissionsFor(client.user);
    if(!permissions.has("CONNECT")) return message.channel.send("I don't have connect permissions.");
    if(!permissions.has("SPEAK")) return message.channel.send("I don't have speak permissions.");

    //check if the user sent an argument
    if(!args.length) return message.channel.send("**You have to search for a song!**");

    const song = args.join(" "); //get the song requested

    //initialize the music player
    const player = client.music.players.spawn({
      guild: message.guild,
      voiceChannel: channel,
      textChannel: message.channel,
      selfDeaf: true
    });

    //attempt to search for the requested song
    client.music.search(song, message.author).then(async res => {
      //switch based on loading type (search term/url/playlist url)
      switch(res.loadType){
        case "TRACK_LOADED":
          player.queue.add(res.tracks[0]); //add the track to the music queue
          //create an embed with song info
          const urlEmbed = new MessageEmbed()
            .setColor(red_light)
            .setThumbnail(message.guild.iconURL())
            .setTitle('Queuing')
            .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri}) - ${Utils.formatTime(res.tracks[0].duration, true)}`)
            .addField('Requested by', `${res.tracks[0].requester.username}`, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(urlEmbed);
          if (!player.playing) player.play(); //if the player is not playing, start playing
          break;
        case "SEARCH_RESULT":
          let i = 1;
          const tracks = res.tracks.slice(0, 10); //get up to 10 results
          const tracksInfo = tracks.map(t => `${i++}. [${t.title}](${t.uri}) - ${Utils.formatTime(t.duration, true)}`).join('\n'); //get info of results

          //create an embed with the results to let the user pick one
          const searchTermsEmbed = new MessageEmbed()
            .setColor(red_light)
            .setTitle('Music Results')
            .setDescription(tracksInfo)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(searchTermsEmbed);

          //the bot will ignore the message if it does not meet these constraints
          //message should be from the user that requested the song
          //message should be greater than or equal to 1 and less than the length of the results array
          const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content < (tracks.length + 1));

          try {
            const response = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }); //set a 10 second timeout on the command

            //if there's a response, add it to the queue
            if(response){
              const entry = response.first().content; //get content of the first response
              const track = tracks[entry - 1];
              player.queue.add(track); //add track to queue
              const searchEmbed = new MessageEmbed()
                .setColor(red_light)
                .setThumbnail(message.guild.iconURL())
                .setTitle('Queuing')
                .setDescription(`[${track.title}](${track.uri}) - ${Utils.formatTime(track.duration, true)}`)
                .addField('Requested by', `${track.requester.username}`, true)
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

              message.channel.send(searchEmbed);
              if (!player.playing) player.play();
            }
          } catch(err){ 
            console.log(err);
          }
          break;
        case "PLAYLIST_LOADED":
          //get the username of the requester
          let requester = "";
          res.playlist.tracks.forEach(track => {
            player.queue.add(track);
            requester = track.requester.username;
          });
          const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true); //get the total duration of the playlist

          const playlistEmbed = new MessageEmbed()
            .setColor(red_light)
            .setThumbnail(message.guild.iconURL())
            .setTitle('Queuing Playlist')
            .setDescription(`${res.playlist.info.name} - ${duration}`)
            .addField('Tracks', `${res.playlist.tracks.length}`, true)
            .addField('Requested by', `${requester}`, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(playlistEmbed);
          if(!player.playing) player.play();
          break;
      }
    }).catch(err => console.log(err.message));
  }
}