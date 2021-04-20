import { Client, Invite, RawInviteCreateData, User } from "../../../../internal";

export default function inviteCreate(client: Client, rawData: RawInviteCreateData) {

    // Parse invite
    const invite: Invite = Invite.fromData(client, {
        code: rawData.code,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        createdAt: new Date(rawData.created_at).getTime(),
        inviter: rawData.inviter ? User._dataFromRawData(rawData.inviter) : null,
        maxAge: rawData.max_age,
        maxUses: rawData.max_uses,
        temporary: rawData.temporary,
        uses: rawData.uses,
        targetUser: rawData.target_user ? {
            id: rawData.target_user.id,
            username: rawData.target_user.username,
            discriminator: rawData.target_user.discriminator,
            avatar: rawData.target_user.avatar
        } : null,
        targetUserType: rawData.target_user_type || null,
        fetchedAt: Date.now()
    });

    // Emit event
    client.emit("inviteCreate", invite, {
        rawData,
        guild: client.guilds.get(invite.guildID),
        channel: client.channels.get(invite.channelID)
    });
}