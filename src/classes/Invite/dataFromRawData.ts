import { InviteData, Member, RawInviteData, RawMemberData, User } from "../../internal";

export default function dataFromRawData(rawData: RawInviteData): InviteData {

    // Parse invite data
    return {
        code: rawData.code,
        channelID: rawData.channel.id,
        guildID: rawData.guild.id,
        createdAt: rawData.created_at ? new Date(rawData.created_at).getTime() : undefined,
        inviter: rawData.inviter ? User._dataFromRawData(rawData.inviter) : null,
        maxAge: rawData.max_age,
        maxUses: rawData.max_uses,
        temporary: rawData.temporary,
        uses: rawData.uses,
        expiresAt: typeof rawData.expires_at === "string" ? new Date(rawData.expires_at).getTime() : rawData.expires_at,
        targetType: rawData.target_type || null,
        targetUser: rawData.target_user ? {
            id: rawData.target_user.id,
            username: rawData.target_user.username,
            discriminator: rawData.target_user.discriminator,
            avatar: rawData.target_user.avatar
        } : null,
        stageInstance: rawData.stage_instance ? {
            topic: rawData.stage_instance.topic,
            participantCount: rawData.stage_instance.participant_count,
            speakerCount: rawData.stage_instance.speaker_count,
            members: rawData.stage_instance.members.map((m: RawMemberData) => Member._dataFromRawData(m, rawData.guild.id))
        } : null,
        fetchedAt: Date.now()
    };
}