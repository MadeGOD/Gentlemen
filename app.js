const words = require("./data.json")
const Discord = require('discord.js')
const client = new Discord.Client({
  disableEveryone: true
})
const fs = require('fs')
const config = require('./config.json')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync('./commands/')

require('./handlers/command.js')(client)

client.on('ready', () => {
    console.log(`${client.user.tag}으로 접속을 완료하였습니다.`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `이 봇은 인트가 욕 쓰다가 현타 와서 만든 봇입니다!
            빌 게이츠 1보다 업그레이드된 성능!`,
            type: 'PLAYING'
        }
    });
});

const prefix = config.prefix

client.on('message', message => {
    if (message.author.bot) return

    let i;
    let length = words.badwords.length;
    for(i=0;i<=length;i++){
        if(message.content.includes(words.badwords[i])){
            message.delete()
                .then(
                    message.channel.send(`${message.author}(이)가 "${message.content}"라고 했음.`)
                )
            break;
        }
    }
})

client.on('message', message => {
    if (message.channel.type === 'dm') return
    if (!message.content.startsWith(prefix)) return
    if (message.author.bot) return
    if (!message.guild) return
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return
  
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
  
    if (command) {
      command.run(client, message, args)
    }
})

client.login(config.token);