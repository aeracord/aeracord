import { Client, Invite, Member, RawInviteCreateData, RawMemberData, User } from "../../../../internal";

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
            members: rawData.stage_instance.members.map((m: RawMemberData) => Member._dataFromRawData(m, rawData.guild_id))
        } : null,
        fetchedAt: Date.now()
    });

    // Emit event
    client.emit("inviteCreate", invite, {
        rawData,
        guild: client.guilds.get(invite.guildID),
        channel: client.channels.get(invite.channelID)
    });
}