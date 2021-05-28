import { Embed, Interaction, InteractionResponseData, INTERACTION_RESPONSE_TYPE_MESSAGE_UPDATE, Message } from "../../internal";

export default function updateMessage(interaction: Interaction, contentOrData: string | Embed | InteractionResponseData, interactionResponseData: InteractionResponseData = {}): Promise<Message | undefined> {

    // Parse data
    if (typeof contentOrData === "string") interactionResponseData.content = contentOrData;
    else if (contentOrData instanceof Embed) interactionResponseData.embeds = [contentOrData];
    else interactionResponseData = contentOrData;

    // Create response
    return interaction.client.createInteractionResponse(interaction, interaction.token, {
        type: INTERACTION_RESPONSE_TYPE_MESSAGE_UPDATE,
        data: interactionResponseData
    });
}