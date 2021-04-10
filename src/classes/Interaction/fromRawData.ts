import { Client, Interaction, InteractionData, Member, RawInteractionData, RawMemberData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawInteractionData): InteractionData {

    // Parse interaction data
    const interactionData: InteractionData = {
        id: rawData.id,
        type: rawData.type,
        token: rawData.token,
        applicationID: rawData.application_id,
        data: rawData.data,
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(client, rawData.member, rawData.guild_id) : null,
        permissions: rawData.member ? rawData.member.permissions : null,
        user: User._fromRawData(client, rawData.user || (rawData.member as RawMemberData).user)
    };

    // Create or update interaction object
    if (client._interactions.cacheAll) Interaction.fromData(client, interactionData);
    else Interaction._updateObjectFromData(client, interactionData);

    // Return
    return interactionData;
}