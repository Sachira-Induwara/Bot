const config = require('../config');

module.exports = {
    name: 'alive',
    desc: 'Bot සක්‍රීයව පවතීදැයි බලන්න',
    category: 'general',
    async execute(sock, from, msg) {
        const imageUrl = 'https://github.com/Sachira-Induwara/Bot/blob/main/images/SACHIYA%20WHATSAPP%20MINI%20BOT.png?raw=true';
        
        const aliveText = `👋 *Hello! I am ${config.botName}*\n\n` +
                          `🤖 *Status:* Online & Active\n` +
                          `📱 *Owner Number:* +${config.ownerNumber}\n` +
                          `⚙️ *Prefix:* ${config.prefix}\n\n` +
                          `_Type *${config.prefix}menu* to see all commands._`;

        await sock.sendMessage(from, {
            image: { url: imageUrl },
            caption: aliveText
        }, { quoted: msg });
    }
};

