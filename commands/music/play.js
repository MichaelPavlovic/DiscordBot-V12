//NOTE: Built based off of this music bot: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

//import
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const { play } = require("../../utils/music");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    run: async(client, message, args, owner) => {
        //check if the user entered a song to search for
        if(!args.length){
            return message.channel.send("**You have to search for a song!**");
        }
        
        //get the voice channel that the user is in
        const { channel } = message.member.voice;

        //if the channel does not exist return a message
        if(!channel){
            return message.channel.send("**You need to be in a voice channel to play a song!**");
        }
      
        //join the arguments together separated by spaces that the user sent and use this as the song name
        const targetsong = args.join(" ");
      
        //get the music queue
        const serverQueue = message.client.queue.get(message.guild.id);
      
        //create a queue object
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };
      
        //initialize variables
        let songData = null;
        let song = null;
      
        //check if the parameter matches a youtube url or playlist url
        //else try to search youtube for the parameter
        if(ytdl.validateURL(args[0])){
            //attempt to get the song info
            try{
                songData = await ytdl.getInfo(args[0]); //get song data
                //create a song object with the data you want from the results
                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds
                };

                //if there is a music queue
                if(serverQueue){
                    //push the song to the back of the queue
                    serverQueue.songs.push(song);

                    //create an embed with the requested song and send it to the channel
                    let embed = new MessageEmbed()
                        .setColor(red_light)
                        .setTitle(':musical_note: Song Request :musical_note:')
                        .setDescription(`[${song.title}](${song.url}) added to queue!`)
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
        
                    message.channel.send(embed).catch(console.error);
                } else{
                    //if there is no music queue push the song to the queue contruct
                    queueConstruct.songs.push(song);
                }
            } catch(error){
                //log an error to the console if one is encountered
                console.error(error);
            }
        } else if(ytpl.validateURL(args[0])){
            //if the first argument is a valid youtube playlist url go into this

            //attempt to get playlist info
            try{
                const playlistID = await ytpl.getPlaylistID(args[0]); //get the playlist id
                const results = await ytpl(playlistID);  //get the playlist info based on the id

                //loop through the length of the playlist
                for(let i = 0; i < results.items.length; i++){
                    //get info on the specific song
                    songData = await ytdl.getInfo(results.items[i].url_simple);
                    //create a song object with info from the specific song
                    song = {
                        title: songData.title,
                        url: songData.video_url,
                        duration: songData.length_seconds
                    };

                    //if there is a queue push it to the back of the queue
                    if(serverQueue){
                        serverQueue.songs.push(song);
                        
                    } else{
                        //else push it to the queue construct
                        queueConstruct.songs.push(song);
                    }
                }

                //create an embed with the playlist info and send it to the channel
                let embed = new MessageEmbed()
                    .setColor(red_light)
                    .setTitle(':musical_note: Playlist Request :musical_note:')
                    .setDescription(`[${results.title}](${results.url}) added to queue!`)
                    .addField('Songs', `${results.total_items}`, true)
                    .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
                message.channel.send(embed).catch(console.error);
            } catch(error){
                //log any encountered error to the console
                console.log(error)
            }
        } else{
            //if the first argument was not a valid youtube url or playlist url go into this block

            //attempt to search for a youtube video based on the search term
            try{
                let options = { limit: 1 } //limit the results to the first result
                const result = await ytsr(targetsong, options); //attempt to get the first result
                songData = await ytdl.getInfo(result.items[0].link); //attempt to get the youtube video info from the resulting item's url

                //create a song object with the data from the result
                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds
                };

                //if there is a queue
                if(serverQueue){
                    //push the song to the back of the queue
                    serverQueue.songs.push(song);

                    //create a new embed with info on the song request
                    let embed = new MessageEmbed()
                        .setColor(red_light)
                        .setTitle(':musical_note: Song Request :musical_note:')
                        .setDescription(`[${song.title}](${song.url}) added to queue!`)
                        .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
        
                    message.channel.send(embed).catch(console.error);
                } else{
                    queueConstruct.songs.push(song); //else add it to the queue construct
                }
            } catch(error){
                console.error(error); //log any errors to the console
            }
        }
          
        //if there is no server queue, set the queue to the queue construct
        if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);
        
        //if there is no server queue
        if(!serverQueue){
            //attempt to join the voice channel and play the queue construct
            try{
                queueConstruct.connection = await channel.join(); //join the voice channel
                play(queueConstruct.songs[0], message); //play
            } catch(error){
                console.error(`Could not join voice channel: ${error}`); //log and errors to the console
                message.client.queue.delete(message.guild.id); //delete the queue
                await channel.leave(); //leave the voice channel
                //return an error message to the channel
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