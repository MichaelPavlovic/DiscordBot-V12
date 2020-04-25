const { rollDice } = require('../../utils/dice');
module.exports = {
    run: async(client, message, args, owner) => {
        message.reply("rolled a " + rollDice());
    },
    config: {
        name: 'roll',
        description: 'Rolls a die',
        usage: '!roll',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['dice']
    }
}