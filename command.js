const config = require('./config');

const commands = {};

function addCommand(name, desc, category, execute) {
    commands[name] = {
        name,
        desc,
        category,
        execute
    };
}

// Default Commands එකතු කිරීම
addCommand('ping', 'Bot වැඩ කරන්නේදැයි පරීක්ෂා කිරීමට', 'general', async (sock, remoteJid, msg) => {
    await sock.sendMessage(remoteJid, { text: '🏓 Pong! SACHIYA MINI BOT සක්‍රීයයි.' }, { quoted: msg });
});

addCommand('owner', 'Owner ගේ තොරතුරු ලබා ගැනීමට', 'general', async (sock, remoteJid, msg) => {
    await sock.sendMessage(remoteJid, { text: `👑 **Owner Info**\n\n- **Bot Name:** ${config.botName}\n- **Owner Number:** +${config.ownerNumber}` }, { quoted: msg });
});

addCommand('menu', 'සියලුම Commands ලැයිස්තුව', 'general', async (sock, remoteJid, msg) => {
    let menuText = `🤖 *${config.botName}* 🤖\n\n`;
    menuText += `📱 *Owner Number:* +${config.ownerNumber}\n\n`;
    menuText += `📌 *Available Commands:*\n`;
    
    for (let cmd in commands) {
        menuText += `• *${config.prefix}${commands[cmd].name}* : ${commands[cmd].desc}\n`;
    }

    await sock.sendMessage(remoteJid, { text: menuText }, { quoted: msg });
});

module.exports = { commands, addCommand };
