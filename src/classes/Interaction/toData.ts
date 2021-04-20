import { Interaction, InteractionData } from "../../internal";

export default function toData(interaction: Interaction): InteractionData {

    // Parse interaction data
    return {
        id: interaction.id,
        type: interaction.type,
        token: interaction.token,
        applicationID: interaction.applicationID,
        data: interaction.data,
        guildID: interaction.guildID,
        channelID: interaction.channelID,
        member: interaction.member,
        permissions: interaction.permissions,
        user: interaction.user,
        fetchedAt: interaction._lastUpdatedAt
    };
}