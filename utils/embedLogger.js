const { EmbedBuilder } = require('discord.js');
const moment = require('moment-timezone');

module.exports = (msg) => {
    // Use Asia/Karachi timezone (UTC+5)
    const time = moment().tz('Asia/Karachi').calendar();
    const authorType = msg.author.bot ? 'Bot' : 'Human';
    const serverName = msg.guild?.name || 'Unknown Server';

    return new EmbedBuilder()
        .setTitle('🔨 Message Deleted')
        .setColor('#ff3333')
        .addFields(
            { name: 'Deleted Message', value: msg.content || '*[Empty Message]*' },
            { name: 'Channel', value: `#${msg.channel.name}`, inline: true },
            { name: 'Author', value: msg.author.tag, inline: true },
            { name: 'Author ID', value: msg.author.id, inline: true },
            { name: 'Author Type', value: authorType, inline: true },
        )
        .setFooter({ text: `${serverName} • ${time}` });
};
