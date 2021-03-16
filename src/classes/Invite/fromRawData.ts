import { InviteData, RawInviteData, User } from "../../internal";

export default function fromRawData(rawData: RawInviteData): InviteData {

    // Parse invite data
    return {
        code: rawData.code,
        channelID: rawData.channel.id,
        guildID: rawData.guild.id,
        createdAt: new Date(rawData.created_at).getTime(),
        inviter: rawData.inviter && User._fromRawData(rawData.inviter),
        maxAge: rawData.max_age || undefined,
        maxUses: rawData.max_uses || undefined,
        temporary: rawData.temporary,
        uses: rawData.uses,
        targetUser: rawData.target_user && {
            id: rawData.target_user.id,
            username: rawData.target_user.username,
            discriminator: rawData.target_user.discriminator,
            avatar: rawData.target_user.avatar || undefined
        },
        targetUserType: rawData.target_user_type
    };
}