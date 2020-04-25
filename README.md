# DiscordBot

For fun project to experiment with the discord.js library and some other libraries/apis.

### Packages Used

- discord.js
- common-tags
- dateformat
- express
- node-fetch
- random-puppy
- urban
- dotenv
- @discordjs/opus
- ytdl-core
- ytdl-core-discord
- simple-youtube-api

### Hosting

Project is being hosted on glitch.com

In the index.js file there is code that will send a ping to the bot every 5 minutes to keep it online but this can sometimes fail. So using another method to ping the bot is a better option.

By default glitch updates code changes on every keypress, so the watch.json file is for changing how often changes get updated. This is to not get your bot token disabled because discord only allows 1000 pings per day before resetting it.
