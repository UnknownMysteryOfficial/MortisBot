const { ActivityType } = require('discord.js');
const { backfillMemberRoles } = require('events/guildMemberAdd');

module.exports = async (client) => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity('Mortis Development', { type: ActivityType.Watching });

    for (const [guildId, guild] of client.guilds.cache) {
        try {
            console.log(`🔄 Running backfill in guild: ${guild.name} (${guildId})`);
            await backfillMemberRoles(guild);
        } catch (err) {
            console.error(`❌ Failed to run backfill in ${guild.name} (${guildId}):`, err);
        }
    }
};
