import { EditInteractionMessageData, Embed, Interaction, Message } from "../../internal";

export default function editOriginalResponse(interaction: Interaction, contentOrData: string | Embed | EditInteractionMessageData, editInteractionMessageData: EditInteractionMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) editInteractionMessageData.embeds = [contentOrData];
    else editInteractionMessageData = contentOrData;

    // Edit response
    return interaction.client.editOriginalInteractionResponse(interaction.token, editInteractionMessageData);
}