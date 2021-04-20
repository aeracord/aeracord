import { InteractionData, Member, RawInteractionData, RawMemberData, User } from "../../internal";

export default function dataFromRawData(rawData: RawInteractionData): InteractionData {

    // Parse interaction data
    return {
        id: rawData.id,
        type: rawData.type,
        token: rawData.token,
        applicationID: rawData.application_id,
        data: rawData.data,
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        member: (rawData.member && rawData.guild_id) ? Member._dataFromRawData(rawData.member, rawData.guild_id) : null,
        permissions: rawData.member ? rawData.member.permissions : null,
        user: User._dataFromRawData(rawData.user || (rawData.member as RawMemberData).user),
        fetchedAt: Date.now()
    };
}