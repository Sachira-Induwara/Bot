const config = require('../config');

module.exports = {
    name: 'menu',
    desc: 'සියලුම Commands ලැයිස්තුව ලබා ගනී',
    category: 'general',
    async execute(sock, from, msg, commands) {
        const imageUrl = 'https://github.com/Sachira-Induwara/Bot/blob/main/images/SACHIYA%20WHATSAPP%20MINI%20BOT.png?raw=true';
        
        let menuText = `🤖 *${config.botName} COMMAND MENU* 🤖\n\n`;
        menuText += `📱 *Owner Number:* +${config.ownerNumber}\n`;
        menuText += `⚙️ *Prefix:* ${config.prefix}\n\n`;
        menuText += `📌 *Available Commands:*\n`;

        for (let cmdName in commands) {
            menuText += `• *${config.prefix}${commands[cmdName].name}* : ${commands[cmdName].desc}\n`;
        }

        await sock.sendMessage(from, {
            image: { url: imageUrl },
            caption: menuText
        }, { quoted: msg });
    }
};
