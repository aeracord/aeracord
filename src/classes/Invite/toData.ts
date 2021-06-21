import { Invite, InviteData, User } from "../../internal";

export default function toData(invite: Invite): InviteData {

    // Parse invite data
    return {
        code: invite.code,
        channelID: invite.channelID,
        guildID: invite.guildID,
        createdAt: invite.createdAt,
        inviter: invite.inviter && User.toData(invite.inviter),
        maxAge: invite.maxAge,
        maxUses: invite.maxUses,
        temporary: invite.temporary,
        uses: invite.uses,
        expiresAt: invite.expiresAt,
        targetType: invite.targetType,
        targetUser: invite.targetUser,
        stageInstance: invite.stageInstance,
        fetchedAt: invite._lastUpdatedAt
    };
}