const Discord = require('discord.js');
module.exports = {
    name: 'invite',
    description: '날 부르는거',
    usage: '궁금하면 500원',
    run: async (client, message, args, ops) => {
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=791952266047258624&permissions=8&scope=bot")
    }
}
