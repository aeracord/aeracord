import { EditInteractionResponseData, Interaction, Message, MessageEmbed } from "../../internal";

export default function editOriginalResponse(interaction: Interaction, contentOrData: string | MessageEmbed | EditInteractionResponseData, editInteractionResponseData: EditInteractionResponseData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionResponseData.content = contentOrData;
    else if (contentOrData instanceof MessageEmbed) editInteractionResponseData.embeds = [contentOrData];
    else editInteractionResponseData = contentOrData;

    // Edit response
    return interaction.client.editOriginalInteractionResponse(interaction.token, editInteractionResponseData);
}