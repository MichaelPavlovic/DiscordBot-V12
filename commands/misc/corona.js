//import
const { MessageEmbed } = require('discord.js');
const { green_dark } = require("../../colours.json");
const { NovelCovid } = require("novelcovid");
const covid = new NovelCovid();

module.exports = {
    run: async(client, message, args, owner) => {

        //check if they entered something
        if(!args[0]) {
            return message.channel.send("Search for a country, state, or get information about every country by typing !corona all.");
        }

        if(args[0] === "all") {
            //if they entered all as the first argument, get information from all countries
            let corona = await covid.all();
            
            //create an embed with the information and send it to the channel
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
            //if they entered state as the first argument go into this block

            //check if they entered second argument
            if(!args[1]){
                return message.channel.send("You have to enter a state to search for!");
            } else{
                //add everything after the first argument together separated by a space
                let state = args.slice(1).join(' ');

                //attempt to search for that state
                let corona = await covid.states(state);
                
                //ADD CHECK FOR IF THE STATE ACTUALLY EXISTS

                //send an embed with the information
                let embed = new MessageEmbed()
                    .setTitle(`${corona.state}`)
                    .setColor(green_dark)
                    .addField("Total Cases", corona.cases, true)
                    .addField("Total Deaths", corona.deaths, true)
                    .addField("Today's Cases", corona.todayCases, true)
                    .addField("Today's Deaths", corona.todayDeaths, true)
                    .addField("Active Cases", corona.active, true)
                    .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
                
                return message.channel.send(embed);
            }
        } else{
            //if they didn't enter all or state as the first search term go into this block

            //add the terms together separated by a space
            let country = args.slice(0).join(' ');

            //attempt to search for information on that country
            let corona = await covid.countries(country);
            
            //ADD CHECK FOR IF THE COUNTRY ACTUALLY EXISTS

            //create an embed with the data and send it to the channel
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
        usage: '!corona all | state [state] | [country]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['covid']
    }
}