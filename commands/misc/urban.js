//NOTE: Build based off of: https://github.com/MenuDocs/Discord.JS-v11.6.1-Tutorials/tree/Episode-23

//import
const { MessageEmbed } = require("discord.js")
const { gold } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const urban = require('urban');

module.exports = {
    run: async (client, message, args, owner) => {
        //check if there is no arguments
        if(!args[0]) return message.channel.send('Enter a word to search for.');
      
        //image of an urban dictionary logo to use in the embed
        const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxeXc6CDMTuda_avVhbE95cPJ2QMoKLxNbHR5pvyUoB0a_y-fl';
      
        //join all of the arguments together separate by spaces
        let msg = args.slice(0).join(' ');

        //set the search term
        let search = urban(msg);
        
        //attempt to get the first result
        try{
            search.first(result => {
                //if there is no result return a message to the channel
                if(!result) return message.channel.send('No results found!');

                //get info from the result
                let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = result;

                //create a new embed with the info and send it to the channel
                let embed = new MessageEmbed()
                    .setColor(gold)
                    .setAuthor(`Urban Dictionary | ${word}`, img)
                    .setThumbnail(img)
                    //set the definition, example, upvote, downvote to a default value if any of the information doesn't exist
                    .setDescription(stripIndents`**Definition** ${definition || 'No definition'}
                    **Example:** ${example || 'No example'}
                    **Upvote:** ${thumbs_up || 0}
                    **Downvote:** ${thumbs_down || 0}
                    **Link:** [link to ${word}](${permalink || 'https://www.urbandictionary.com/'})`) //hyper link syntax for embeds
                    .setTimestamp()
                    .setFooter(`Written by ${author || 'Unknown'}`);
              
              message.channel.send(embed);
            })
        } catch(e){
            console.log(e); //log the error to the console
          
            //return a message to the channel if an error was encountered
            return message.channel.send('Error. Try again!');
        }
    },
    config: {
        name: 'urban',
        description: 'Gets a definition from urban dictionary',
        usage: '!urban [word]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['ud']
    }
}