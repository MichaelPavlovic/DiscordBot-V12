require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ partials: ['MESSAGE'] });

client.queue = new Map();

['commands', 'aliases'].forEach(collection => client[collection] = new Collection());//loop through commands and aliases
['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));//loop through contents of handlers folder

client.login(process.env.BOT_TOKEN);