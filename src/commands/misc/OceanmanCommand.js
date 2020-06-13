const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class OceanmanCommand extends BaseCommand {
  constructor() {
    super('oceanman', 'misc', [], 'oceanman');
  }

  run(client, message, args) {
    //send a funny message to the chanel
    message.channel.send('OCEAN MAN 🌊 😍 Take me by the hand ✋ lead me to the land that you understand 🙌 🌊 OCEAN MAN 🌊 😍 The voyage 🚲 to the corner of the 🌎 globe is a real trip 👌 🌊 OCEAN MAN 🌊 😍 The crust of a tan man 👳 imbibed by the sand 👍 Soaking up the 💦 thirst of the land 💯');
  }
}