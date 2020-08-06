const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../../colours.json");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(process.env.YOUTUBE_API_KEY);
const { play } = require("../../utils/music");

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', ['p'], 'play [url] | [song]');
  }

  async run(client, message, args) {
    //check if the user is in a voice channel
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("**You need to join a voice channel to play a song!**");

    //check if the bot has perms to connect & speak in the voice channel
    const permissions = channel.permissionsFor(client.user);
    if(!permissions.has("CONNECT")) return message.channel.send("I don't have connect permissions.");
    if(!permissions.has("SPEAK")) return message.channel.send("I don't have speak permissions.");

    //check if the user sent an argument
    if(!args.length) return message.channel.send("**You have to search for a song!**");

    const query = args.join(" "); //get the song requested

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;

    if(ytdl.validateURL(query)){
      //valid song url
      try{
        songData = await ytdl.getInfo(query);

        const duration = timeConverter(songData.videoDetails.lengthSeconds);

        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: duration,
          author: songData.videoDetails.author.name,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[0].url,
          requester: message.author
        };

        if(serverQueue){
          serverQueue.songs.push(song);
        } else{
          queueConstruct.songs.push(song);
        }

        let embed = new MessageEmbed()
          .setColor(red_light)
          .setThumbnail(song.thumbnail)
          .setAuthor('Song Request')
          .setDescription(`[${song.title}](${song.url}) by ${song.author} added to the queue!`)
          .addField('Requested by', `${song.requester}`, true)
          .addField('Duration', `${song.duration}`, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

          message.channel.send(embed).catch(console.error);
      } catch(error){
        console.error(error);
      }
    } else if(ytpl.validateURL(query)){
      //valid playlist url
      try{
        const playlistID = await ytpl.getPlaylistID(query);
        const results = await ytpl(playlistID);
        for(let i = 0; i < results.items.length; i++){
          songData = await ytdl.getInfo(results.items[i].url_simple);

          const duration = timeConverter(songData.videoDetails.lengthSeconds);

          song = {
            title: songData.videoDetails.title,
            url: songData.videoDetails.video_url,
            duration: duration,
            author: songData.videoDetails.author.name,
            thumbnail: songData.videoDetails.thumbnail.thumbnails[0].url,
            requester: message.author
          };
          if(serverQueue){
            serverQueue.songs.push(song);
          } else{
            queueConstruct.songs.push(song);
          }
        }

        let embed = new MessageEmbed()
          .setColor(red_light)
          .setAuthor('Playlist Request')
          .setDescription(`[${results.title}](${results.url}) added to the queue!`)
          .addField('Songs', `${results.total_items}`, true)
          .addField('Requested by', `${song.requester}`, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed).catch(console.error);
      } catch(error){
        console.log(error)
      }
    } else{
      //search term
      try {
        const result = await youtube.searchVideos(query, 1);
        songData = await ytdl.getInfo(result[0].url);

        const duration = timeConverter(songData.videoDetails.lengthSeconds);

        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: duration,
          author: songData.videoDetails.author.name,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[0].url,
          requester: message.author
        };

        if(serverQueue){
          serverQueue.songs.push(song);
        } else{
          queueConstruct.songs.push(song);
        }

        let embed = new MessageEmbed()
          .setColor(red_light)
          .setThumbnail(`${song.thumbnail}`)
          .setAuthor('Song Request')
          .setDescription(`[${song.title}](${song.url}) by ${song.author} added to the queue!`)
          .addField('Requested by', `${song.requester}`, true)
          .addField('Duration', `${song.duration}`, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed).catch(console.error);
      } catch (error) {
        console.log(error);
      }
    }

    if (!serverQueue) {
      message.client.queue.set(message.guild.id, queueConstruct);
      
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message, client);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
      }
    }
  }
}

function timeConverter(dur) {
  dur = Number(dur);
  var m = Math.floor(dur % 3600 / 60);
  var s = Math.floor(dur % 3600 % 60);

  var min = m > 0 ? m + (m == 1) : "00";
  var sec = s > 0 ? s + (s == 1) : "00";
  return `${min}:${sec}`; 
}