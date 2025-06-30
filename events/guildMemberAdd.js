module.exports = async (client, member) => {
    const MEMBER_ROLE_ID = '1030703527435178014';

    try {
        const role = member.guild.roles.cache.get(MEMBER_ROLE_ID);
        if (!role) return console.error('❌ Member role not found. Check the ID.');

        await member.roles.add(role);
        console.log(`✅ Added member role to ${member.user.tag}`);
    } catch (error) {
        console.error(`❌ Failed to add member role to ${member.user.tag}:`, error);
    }
};
