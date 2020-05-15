const { MessageEmbed } = require("discord.js")
const { red_dark } = require("../../colours.json");
const { getPokemon } = require("../../utils/pokemon");

module.exports = {
    run: async (client, message, args, owner) => {
        if(!args[0]) return message.channel.send('Enter a pokemon to search for!');
        
        if(args[1]) return message.channel.send('You can only search for one pokemon!');

        const pokemon = args[0];

        try{
            const data = await getPokemon(pokemon.toLowerCase());
            const { sprites, name, id, types, abilities } = data;

            let embed = new MessageEmbed()
                .setColor(red_dark)
                .setTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} #${id}`)
                .setThumbnail(`${sprites.front_default}`);
                types.forEach(type => embed.addField('Type', type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1), true));
                abilities.forEach(ability => embed.addField('Ability', ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1), true));
                embed.setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL()); 

            message.channel.send(embed);
        } catch(err){
            console.log(err);
            message.channel.send(`The Pokemon ${pokemon} doesn't exist.`);
        }
    },
    config: {
        name: 'poke',
        description: 'Returns info about a pokemon',
        usage: '!poke [pokemon]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['pokemon']
    }
}