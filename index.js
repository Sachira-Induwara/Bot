const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const config = require('./config');
const { commands } = require('./command');

async function startBot() {
    // Session ID එක තියෙනවා නම් එකෙන් creds.json එක හදන කොටස
    if (config.sessionId && !fs.existsSync('./auth_info/creds.json')) {
        if (!fs.existsSync('./auth_info')) {
            fs.mkdirSync('./auth_info');
        }
        try {
            // Base64 decoded string එකක් නම්
            const sessionData = Buffer.from(config.sessionId, 'base64').toString('utf-8');
            fs.writeFileSync('./auth_info/creds.json', sessionData);
        } catch (e) {
            console.log("Session ID එක creds.json වලට මාරු කිරීමේ දෝෂයක්!");
        }
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    // ඉතිරි index.js කෝඩ් එක පෙර පරිදිම පවතී...
