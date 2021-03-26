import { Client, InviteData, User } from "../../../../internal";
import { RawInviteCreateData } from "./rawInviteCreateData";

export default function inviteCreate(client: Client, rawData: RawInviteCreateData) {

    // Parse invite data
    const inviteData: InviteData = {
        code: rawData.code,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        createdAt: new Date(rawData.created_at).getTime(),
        inviter: rawData.inviter ? User._fromRawData(client, rawData.inviter) : null,
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
        targetUserType: rawData.target_user_type || null
    };

    // Emit event
    client.emit("inviteCreate", inviteData, {
        rawData,
        invite: client.invites.get(inviteData.code),
        guild: client.guilds.get(inviteData.guildID),
        channel: client.channels.get(inviteData.channelID)
    });
}