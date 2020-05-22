//NOTE: I built the base music commands from: https://github.com/CTK-WARRIOR/Discord-Music-Bot-tutorial

//import
const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../colours.json");


module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        
        //if there is no song: leave the voice channel, delete the queue and send a message to the channel that the queue is finished
        if(!song){
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            return queue.textChannel.send("**Queue finished**").catch(console.error);
        }
        
        //attempt to get the stream for the song
        try{
            var stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
        } catch(error){
            //if there is a queue, add the song to the end of the queue
            if(queue){
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
            //if there is a copyright error send a message to the channel
            if(error.message.includes === "copyright") {
                return message.channel.send("**Copyright.**");
            } else{
                console.error(error);
            }
        }
        
        const dispatcher = queue.connection.play(stream, { type: "opus" }).on("finish", () => {
            //check if the queue loop is enabled
            if(queue.loop) {
                let lastsong = queue.songs.shift();
                queue.songs.push(lastsong);
                module.exports.play(queue.songs[0], message);
            } else{
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
        }).on("error", console.error);

        //sets the volume of the dispatcher to 100%
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        
        //send an embed of the currently playing song when it starts to play
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle(':musical_note: **Now Playing** :musical_note:')
            .setDescription(`[${song.title}](${song.url})`)
            .setFooter(`© ${message.guild.me.displayName}`, message.client.user.displayAvatarURL());

        queue.textChannel.send(embed);
    }
}