const config = require('../config');

const serialize = (sock, msg) => {
    if (!msg) return msg;
    
    const m = {};
    m.key = msg.key;
    m.from = msg.key.remoteJid;
    m.fromMe = msg.key.fromMe;
    m.isGroup = m.from.endsWith('@g.us');
    m.sender = m.fromMe ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : (m.isGroup ? msg.key.participant : m.from);
    
    // Message එකේ Text කොටස ලබා ගැනීම
    m.type = Object.keys(msg.message || {})[0];
    m.body = msg.message?.conversation || 
             msg.message?.extendedTextMessage?.text || 
             msg.message?.imageMessage?.caption || 
             msg.message?.videoMessage?.caption || '';

    // Prefix එක සහ Command වෙන් කරගැනීම
    m.isCmd = m.body.startsWith(config.prefix);
    m.command = m.isCmd ? m.body.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
    m.args = m.body.trim().split(/ +/).slice(1);

    return m;
};

module.exports = { serialize };

