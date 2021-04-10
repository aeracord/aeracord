import { Client, Interaction, InteractionData, RawInteractionData, TextBasedChannel } from "../../../../internal";

export default function interactionCreate(client: Client, rawData: RawInteractionData) {

    // Parse interaction data
    const interactionData: InteractionData = Interaction._fromRawData(client, rawData);

    // Emit event
    client.emit("interactionCreate", interactionData, {
        rawData,
        interaction: client.interactions.get(interactionData.id),
        guild: interactionData.guildID ? client.guilds.get(interactionData.guildID) : undefined,
        channel: client.channels.get(interactionData.channelID)
    });
}