import { BaseEditMessageData, Embed, Interaction, Message } from "../../internal";

export default function editOriginalResponse(interaction: Interaction, contentOrData: string | Embed | BaseEditMessageData, editMessageData: BaseEditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) editMessageData.embeds = [contentOrData];
    else editMessageData = contentOrData;

    // Edit response
    return interaction.client.editOriginalInteractionResponse(interaction.token, editMessageData);
}