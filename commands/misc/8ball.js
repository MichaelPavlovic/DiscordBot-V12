module.exports = {
    run: async(client, message, args, owner) => {
        if(!args[0]) return message.reply('Ask a question!');//check if the user asked a question

        let replies = ['Yes', 'No', 'Ask again later']; //create an array of possible replies
        let result = Math.floor(Math.random() * replies.length); //get a random number based on the size of the array

        message.reply(replies[result]); //select a random reply from the array
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