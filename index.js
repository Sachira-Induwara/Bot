const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Client එක initialize කිරීම (session එක save වෙන්න LocalAuth භාවිත කෙරේ)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code එක terminal එකේ පෙන්වීම
client.on('qr', (qr) => {
    console.log('පහත QR Code එක WhatsApp මගින් Scan කරන්න:');
    qrcode.generate(qr, { small: true });
});

// Bot සූදානම් වූ පසු ලැබෙන Message එක
client.on('ready', () => {
    console.log('WhatsApp Bot සාර්ථකව සම්බන්ධ විය!');
});

// Messages වලට පිළිතුරු දීම (Auto-reply logic)
client.on('message', async (msg) => {
    const text = msg.body.toLowerCase();

    if (text === 'hi' || text === 'hello') {
        msg.reply('හලෝ! මම ඔයාගේ WhatsApp Bot. මට උදව් කරන්න පුළුවන් කොහොමද?');
    } else if (text === 'ping') {
        msg.reply('pong');
    } else if (text === 'help') {
        msg.reply('ලබාගත හැකි Command ලැයිස්තුව:\n1. hi\n2. ping\n3. help');
    }
});

client.initialize();
