const fs = require('fs');
const path = require('path');

const commands = {};

// plugins folder එක ඇතුලේ තියෙන සියලුම command files load කරගැනීම
const pluginsPath = path.join(__dirname, 'plugins');

if (fs.existsSync(pluginsPath)) {
    const pluginFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

    for (const file of pluginFiles) {
        const command = require(path.join(pluginsPath, file));
        if (command.name) {
            commands[command.name] = command;
        }
    }
}

module.exports = { commands };
