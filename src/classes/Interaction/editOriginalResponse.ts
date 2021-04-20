import { EditInteractionResponseData, Embed, Interaction, Message } from "../../internal";

export default function editOriginalResponse(interaction: Interaction, contentOrData: string | Embed | EditInteractionResponseData, editInteractionResponseData: EditInteractionResponseData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionResponseData.content = contentOrData;
    else if (contentOrData instanceof Embed) editInteractionResponseData.embeds = [contentOrData];
    else editInteractionResponseData = contentOrData;

    // Edit response
    return interaction.client.editOriginalInteractionResponse(interaction.token, editInteractionResponseData);
}