const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class EightballCommand extends BaseCommand {
  constructor() {
    super('8ball', 'misc', ['magic8', '8'], '8ball');
  }

  run(client, message, args) {
    if(!args[0]) return message.reply('Ask a question!');//check if the user asked a question

    let replies = ['Yes', 'No', 'Ask again later']; //create an array of possible replies
    let result = Math.floor(Math.random() * replies.length); //get a random number based on the size of the array

    message.reply(`Walter says: ${replies[result]}`); //select a random reply from the array
  }
}