import { Invite, InviteData } from "../../internal";

export default function updateObject(invite: Invite, inviteData: InviteData) {

    // Unmark as deleted
    if (invite.deleted) invite._unmarkAsDeleted();

    // Set data
    invite.channelID = inviteData.channelID;
    invite.guildID = inviteData.guildID;
    invite.createdAt = inviteData.createdAt;
    invite.inviter = inviteData.inviter;
    invite.maxAge = inviteData.maxAge;
    invite.maxUses = inviteData.maxUses;
    invite.temporary = inviteData.temporary;
    invite.uses = inviteData.uses;
    invite.targetUser = inviteData.targetUser;
    invite.targetUserType = inviteData.targetUserType;
}