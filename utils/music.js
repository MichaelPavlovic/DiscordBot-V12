const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require('discord.js');
const { red_light } = require("../colours.json");

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        
        if(!song){
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            return queue.textChannel.send("**Queue finished**").catch(console.error);
        }
        
        try{
            var stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
        } catch(error){
            if(queue){
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
            if(error.message.includes === "copyright") {
                return message.channel.send("**Copyright.**");
            } else{
                console.error(error);
            }
        }
        
        const dispatcher = queue.connection.play(stream, { type: "opus" }).on("finish", () => {
            if(queue.loop) {
                let lastsong = queue.songs.shift();
                queue.songs.push(lastsong);
                module.exports.play(queue.songs[0], message);
            } else{
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
        }).on("error", console.error);

        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setTitle(':musical_note: **Now Playing** :musical_note:')
            .setDescription(`[${song.title}](${song.url})`)
            .setFooter(`© ${message.guild.me.displayName}`, message.client.user.displayAvatarURL());

        queue.textChannel.send(embed);
    }
}