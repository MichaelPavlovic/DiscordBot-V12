const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RollCommand extends BaseCommand {
  constructor() {
    super('roll', 'misc', [], 'roll');
  }

  run(client, message, args) {
    let roll = Math.floor(Math.random() * 6) + 1; //return a random integer from 1 to 6

    message.reply("rolled a " + roll); //reply to the user with a random number from the dice module
  }
}