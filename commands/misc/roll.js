module.exports = {
    run: async(client, message, args, owner) => {
        let roll = Math.floor(Math.random() * 6) + 1; //return a random integer from 1 to 6

        message.reply("rolled a " + roll); //reply to the user with a random number from the dice module
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