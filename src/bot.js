require('dotenv').config();
const { Client } = require('discord.js');
const { ErelaClient } = require('erela.js');
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/registry');
const client = new Client({ partials: ['MESSAGE']});

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  client.music = new ErelaClient(client, [
    {
      host: process.env.HOST,
      port: process.env.PORT,
      password: process.env.PASSWORD
    }
  ], {"userId": process.env.DISCORD_BOT_CLIENTID});
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await registerMusicEvents(client.music, '../musicevents');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();