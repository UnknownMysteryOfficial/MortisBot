const createLogEmbed = require('../utils/embedLogger');

module.exports = async (client, msg) => {
    if (msg.author.bot) return;

    const linkRegex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const inviteRegex = /(discord\.(gg|com)\/(invite\/)?|discord\.com\/invite\/)([a-zA-Z0-9-]+)/gi;

    if (linkRegex.test(msg.content) || inviteRegex.test(msg.content)) {
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
