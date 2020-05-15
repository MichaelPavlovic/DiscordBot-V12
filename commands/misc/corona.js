const { MessageEmbed } = require('discord.js');
const { green_dark } = require("../../colours.json");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports = {
    run: async(client, message, args, owner) => {
        if(!args.length) {
            return message.channel.send("Enter a country to search for!")
        }
          
        if(args[0] === "all") {
            let corona = await track.all();
            
            let embed = new MessageEmbed()
            .setTitle("Global Cases")
            .setColor(green_dark)
            .addField("Total Cases", corona.cases, true)
            .addField("Total Deaths", corona.deaths, true)
            .addField("Total Recovered", corona.recovered, true)
            .addField("Today's Cases", corona.todayCases, true)
            .addField("Today's Deaths", corona.todayDeaths, true)
            .addField("Active Cases", corona.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
            return message.channel.send(embed);    
        } else if (args[0] === "state"){
            let state = args.slice(1).join(' ');

            let corona = await track.states(state);
            
            let embed = new MessageEmbed()
            .setTitle(`${corona.state}`)
            .setColor(green_dark)
            .addField("Total Cases", corona.cases, true)
            .addField("Total Deaths", corona.deaths, true)
            .addField("Today's Cases", corona.todayCases, true)
            .addField("Today's Deaths", corona.todayDeaths, true)
            .addField("Active Cases", corona.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
            return message.channel.send(embed) ;
        } else {
            let country = args.slice(0).join(' ');

            let corona = await track.countries(country);
            
            let embed = new MessageEmbed()
            .setTitle(`${corona.country}`)
            .setColor(green_dark)
            .addField("Total Cases", corona.cases, true)
            .addField("Total Deaths", corona.deaths, true)
            .addField("Total Recovered", corona.recovered, true)
            .addField("Today's Cases", corona.todayCases, true)
            .addField("Today's Deaths", corona.todayDeaths, true)
            .addField("Active Cases", corona.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
            return message.channel.send(embed) ;
          }
    },
    config: {
        name: 'corona',
        description: 'Displays data about the corona virus',
        usage: '!corona all | [country]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['covid']
    }
}