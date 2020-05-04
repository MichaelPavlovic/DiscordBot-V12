const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { play } = require("../../utils/music");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        if(!args.length){
            return message.channel.send("**You have to search for a song!**");
        }
          
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You need to be in a voice channel to play a song!**");
        }
      
        const targetsong = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const urlcheck = videoPattern.test(args[0]);
      
        if(!videoPattern.test(args[0]) && playlistPattern.test(args[0])){
            return message.channel.send("Unable to play playlist.");
        }
      
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
      
        //check if the parameter matches a youtube url
        //else try to search youtube for the parameter
        if(urlcheck){
            try{
                songData = await ytdl.getInfo(args[0]);
                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds
                };
            } catch(error){
                console.error(error);
            }
        } else{
            try{
                let options = { limit: 1 }
                const result = await ytsr(targetsong, options);
                songData = await ytdl.getInfo(result.items[0].link);
                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds
                };
            } catch(error){
                console.error(error);
            }
        }
          
        if(serverQueue){
            serverQueue.songs.push(song);
            let embed = new MessageEmbed()
                .setColor(red_light)
                .setTitle(':musical_note: Song Request')
                .setDescription(`\`${song.title}\` added to queue!`)
                .addField('Duration', `${song.duration}`, true)
                .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

            return serverQueue.textChannel.send(embed).catch(console.error);
        } else{
            queueConstruct.songs.push(song);
        }
          
        if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);
          
        if(!serverQueue){
            try{
                queueConstruct.connection = await channel.join();
                play(queueConstruct.songs[0], message);
            } catch(error){
                console.error(`Could not join voice channel: ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send({embed: {"description": `Unable to join voice channel: ${error}`, "color": "#ff2050"}}).catch(console.error);
            }
        }
    },
    config: {
        name: 'play',
        description: 'Plays a song',
        usage: '!play [url] | [song]',
        category: 'music',
        accessableby: 'Members',
        aliases: ['p']
    }
}