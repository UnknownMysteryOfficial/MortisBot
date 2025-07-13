const MEMBER_ROLE_ID = '1030703527435178014';

module.exports = async (client, member) => {
    try {
        const role = member.guild.roles.cache.get(MEMBER_ROLE_ID);
        if (!role) return console.error('❌ Member role not found. Check the ID.');

        await member.roles.add(role);
        console.log(`✅ Added member role to ${member.user.tag}`);
    } catch (error) {
        console.error(`❌ Failed to add member role to ${member.user.tag}:`, error);
    }
};

async function backfillMemberRoles(guild) {
    const MEMBER_ROLE_ID = '1030703527435178014';

    const role = guild.roles.cache.get(MEMBER_ROLE_ID);
    if (!role) return console.error('❌ Member role not found. Check the ID.');

    const members = await guild.members.fetch();
    let count = 0;

    for (const [, member] of members) {
        if (!member.user.bot && !member.roles.cache.has(MEMBER_ROLE_ID)) {
            try {
                await member.roles.add(role);
                console.log(`🛠️ Fixed: Added member role to ${member.user.tag}`);
                count++;
            } catch (err) {
                console.warn(`⚠️ Couldn't assign role to ${member.user.tag}:`, err);
            }
        }
    }

    console.log(`✅ Backfill complete. ${count} member(s) updated.`);
}

module.exports.backfillMemberRoles = backfillMemberRoles;
