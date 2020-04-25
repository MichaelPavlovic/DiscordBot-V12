module.exports = {
    run: async(client, message, args, owner) => {
        if(!args[0]) return message.reply('Ask a question!');//check if the user asked a question

        let replies = ['Yes', 'No', 'Ask again later'];//create an array of replies
        let result = Math.floor(Math.random() * replies.length);//get a random reply

        message.reply(replies[result]);
    },
    config: {
        name: '8ball',
        description: 'Answers your question',
        usage: '!8ball',
        category: 'misc',
        accessableby: 'Members',
        aliases: ['8b', 'ask', 'magic8']
    }
}