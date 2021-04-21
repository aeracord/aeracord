import { CreateInteractionResponseData, Embed, Interaction, INTERACTION_RESPONSE_TYPE_MESSAGE, Message } from "../../internal";

export default function respond(interaction: Interaction, contentOrData: string | Embed | CreateInteractionResponseData, createInteractionResponseData: CreateInteractionResponseData = { type: INTERACTION_RESPONSE_TYPE_MESSAGE }): Promise<Message> {

    // Set data
    if (!createInteractionResponseData.data) createInteractionResponseData.data = {};

    // Parse data
    if (typeof contentOrData === "string") createInteractionResponseData.data.content = contentOrData;
    else if (contentOrData instanceof Embed) createInteractionResponseData.data.embeds = [contentOrData];
    else createInteractionResponseData = contentOrData;

    // Create response
    return interaction.client.createInteractionResponse(interaction, interaction.token, createInteractionResponseData);
}