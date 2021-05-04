import { Interaction, InteractionData, Member, User } from "../../internal";

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
        member: interaction.member && Member.toData(interaction.member),
        permissions: interaction.permissions,
        user: User.toData(interaction.user),
        fetchedAt: interaction._lastUpdatedAt
    };
}