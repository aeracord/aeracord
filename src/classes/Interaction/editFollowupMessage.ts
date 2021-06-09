import { EditInteractionMessageData, Embed, Interaction, Message, MessageResolvable } from "../../internal";

export default function editFollowupMessage(interaction: Interaction, message: MessageResolvable, contentOrData: string | Embed | EditInteractionMessageData, editInteractionMessageData: EditInteractionMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) editInteractionMessageData.embeds = [contentOrData];
    else editInteractionMessageData = contentOrData;

    // Edit response
    return interaction.client.editFollowupMessage(interaction.token, message, editInteractionMessageData);
}