const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const config = require('./config');
const { commands } = require('./command');
const { serialize } = require('./lib/msg');
const { getTime, getDate } = require('./lib/functions');

async function startBot() {
    if (config.sessionId && !fs.existsSync('./auth_info/creds.json')) {
        if (!fs.existsSync('./auth_info')) {
            fs.mkdirSync('./auth_info');
        }
        try {
            const sessionData = Buffer.from(config.sessionId, 'base64').toString('utf-8');
            fs.writeFileSync('./auth_info/creds.json', sessionData);
        } catch (e) {
            console.log("Session ID Converting Error:", e.message);
        }
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: [config.botName, "Chrome", "1.0.0"]
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(`\n=== ${config.botName} QR Code එක Scan කරන්න ===\n`);
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('සම්බන්ධතාවය බිඳ වැටුණි. නැවත සම්බන්ධ වෙමින්...', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log(`\n✅ ${config.botName} සාර්ථකව සම්බන්ධ විය!`);
            console.log(`⏰ Time: ${getTime()} | 📅 Date: ${getDate()}`);
            console.log(`📱 Owner Number: +${config.ownerNumber}\n`);
        }
    });

    // Messages Handle කිරීම
    sock.ev.on('messages.upsert', async (m) => {
        const rawMsg = m.messages[0];
        if (!rawMsg.message || rawMsg.key.fromMe) return;

        const msg = serialize(sock, rawMsg);

        if (msg.isCmd && commands[msg.command]) {
            try {
                // Command එක execute කිරීම
                await commands[msg.command].execute(sock, msg.from, rawMsg, commands);
            } catch (error) {
                console.error('Command Error:', error);
                await sock.sendMessage(msg.from, { text: '⚠️ Command එක ක්‍රියාත්මක කිරීමේදී දෝෂයක් සිදු විය.' });
            }
        }
    });
}

startBot();
