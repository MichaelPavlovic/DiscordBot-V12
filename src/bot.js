require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client({ partials: ['MESSAGE']});

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  client.queue = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();