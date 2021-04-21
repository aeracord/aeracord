import { CreateInteractionResponseData, Interaction, INTERACTION_RESPONSE_TYPE_MESSAGE, Message, MessageEmbed } from "../../internal";

export default function respond(interaction: Interaction, contentOrData: string | MessageEmbed | CreateInteractionResponseData, createInteractionResponseData: CreateInteractionResponseData = { type: INTERACTION_RESPONSE_TYPE_MESSAGE }): Promise<Message> {

    // Set data
    if (!createInteractionResponseData.data) createInteractionResponseData.data = {};

    // Parse data
    if (typeof contentOrData === "string") createInteractionResponseData.data.content = contentOrData;
    else if (contentOrData instanceof MessageEmbed) createInteractionResponseData.data.embeds = [contentOrData];
    else createInteractionResponseData = contentOrData;

    // Create response
    return interaction.client.createInteractionResponse(interaction, interaction.token, createInteractionResponseData);
}