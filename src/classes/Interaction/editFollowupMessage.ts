import { EditInteractionResponseData, Embed, Interaction, MessageData, MessageResolvable } from "../../internal";

export default function editFollowupMessage(interaction: Interaction, message: MessageResolvable, contentOrData: string | Embed | EditInteractionResponseData, editInteractionResponseData: EditInteractionResponseData = {}): Promise<MessageData> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionResponseData.content = contentOrData;
    else if (contentOrData instanceof Embed) editInteractionResponseData.embeds = [contentOrData];
    else editInteractionResponseData = contentOrData;

    // Edit response
    return interaction.client.editFollowupMessage(interaction.token, message, editInteractionResponseData);
}