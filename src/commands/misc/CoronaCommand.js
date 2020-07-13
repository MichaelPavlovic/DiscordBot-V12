const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { green_dark } = require("../../../colours.json");
const api = require('novelcovid');

module.exports = class CoronaCommand extends BaseCommand {
  constructor() {
    super('corona', 'misc', ['covid'], 'corona all | state [state] | [country]');
  }

  async run(client, message, args) {
    //check if they entered something
    if(!args[0]) {
      return message.channel.send("Search for a country, state, or get information about every country by typing !corona all.");
    }

    if(args[0] === "all") {
      //if they entered all as the first argument, get information from all countries
      await api.all().then((data) => {
        //create an embed with the information and send it to the channel
        let embed = new MessageEmbed()
          .setTitle("Global Cases")
          .setColor(green_dark)
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
      
        return message.channel.send(embed);
      }).catch(err => console.log(err));
      
      
    } else if (args[0] === "state"){
      //if they entered state as the first argument go into this block

      //check if they entered second argument
      if(!args[1]){
          return message.channel.send("You have to enter a state to search for!");
      } else{
        //add everything after the first argument together separated by a space
        let state = args.slice(1).join(' ');

        //attempt to search for that state
        await api.states({state: state}).then((data) => {
          if(data.state === undefined) return message.channel.send("Are you sure that state exists?");
          //send an embed with the information
          let embed = new MessageEmbed()
            .setTitle(`${data.state}`)
            .setColor(green_dark)
            .addField("Total Cases", data.cases, true)
            .addField("Total Deaths", data.deaths, true)
            .addField("Today's Cases", data.todayCases, true)
            .addField("Today's Deaths", data.todayDeaths, true)
            .addField("Active Cases", data.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
          
          return message.channel.send(embed);
        }).catch(err => console.log(err));
      }
    } else{
      //if they didn't enter all or state as the first search term go into this block

      //add the terms together separated by a space
      let country = args.slice(0).join(' ');

      //attempt to search for information on that country
      await api.countries({country: country}).then((data) => {
        if(data.country === undefined) return message.channel.send("Are you sure that country exists?");
        
        //create an embed with the data and send it to the channel
        let embed = new MessageEmbed()
          .setTitle(`${data.country}`)
          .setColor(green_dark)
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
            
        return message.channel.send(embed);
      }).catch(err => console.log(err));
    }
  }
}