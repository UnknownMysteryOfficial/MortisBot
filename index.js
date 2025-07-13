require('./keep_alive');
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User
    ],
});

const eventsPath = path.join(__dirname, 'events');
fs.readdirSync(eventsPath).forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];

    client.on(eventName, (...args) => event(client, ...args));
    console.log(`✅ Loaded event: ${eventName}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
