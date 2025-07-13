const createLogEmbed = require('../utils/embedLogger');

const ALLOWED_ROLE_ID = '1345763629063995392';

module.exports = async (client, msg) => {
    if (msg.author.bot) return;

    const linkRegex = /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/gi;
    const inviteRegex = /\b(discord\.gg\/|discord\.com\/invite\/)[a-zA-Z0-9-]+\b/gi;

    const whitelist = [
        'pastebin.com',
        'builtbybit.com',
        'gitbook.io'
    ];

    const containsLink = linkRegex.test(msg.content) || inviteRegex.test(msg.content);
    if (!containsLink) return;

    const hasAllowedRole = msg.member.roles.cache.has(ALLOWED_ROLE_ID);
    if (hasAllowedRole) return;

    const lowerContent = msg.content.toLowerCase();
    const isWhitelisted = whitelist.some(domain => lowerContent.includes(domain));

    if (!isWhitelisted) {
        try {
            await msg.delete();

            const logChannel = msg.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            if (!logChannel) return console.error('❌ Log channel not found');

            const embed = createLogEmbed(msg);
            await logChannel.send({ embeds: [embed] });

        } catch (err) {
            console.error('❌ Error handling message:', err);
        }
    }
};
