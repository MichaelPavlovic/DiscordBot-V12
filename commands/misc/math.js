const { calculator } = require('../../utils/calculator');
module.exports = {
    run: async(client, message, args, owner) => {
        if(!args[0]) return message.reply('Enter a first number');
        if(!args[1]) return message.reply('Enter an operator');
        if(!args[2]) return message.reply('Enter a second number');

        message.channel.send(calculator(args[0], args[1], args[2]));
    },
    config: {
        name: 'math',
        description: 'Answers your math question',
        usage: '!math [number] [+ | - | * | /] [number]',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['calc']
    }
}