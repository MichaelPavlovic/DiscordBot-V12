const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

/******* beginning of bot *******/
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ partials: ['MESSAGE'] });

client.queue = new Map();

['commands', 'aliases'].forEach(collection => client[collection] = new Collection());//loop through commands and aliases
['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));//loop through contents of handlers folder

client.login(process.env.BOT_TOKEN);//login