import { Client, Interaction, RawInteractionData } from "../../../../internal";

export default function interactionCreate(client: Client, rawData: RawInteractionData) {

    // Parse interaction
    const interaction: Interaction = Interaction._fromRawData(client, rawData);

    // Emit event
    client.emit("interactionCreate", interaction, {
        rawData,
        guild: interaction.guildID ? client.guilds.get(interaction.guildID) : undefined,
        channel: client.channels.get(interaction.channelID)
    });
}