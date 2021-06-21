import { BaseEditMessageData, Embed, Interaction, Message, MessageResolvable } from "../../internal";

export default function editFollowupMessage(interaction: Interaction, message: MessageResolvable, contentOrData: string | Embed | BaseEditMessageData, editMessageData: BaseEditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) editMessageData.embeds = [contentOrData];
    else editMessageData = contentOrData;

    // Edit response
    return interaction.client.editFollowupMessage(interaction.token, message, editMessageData);
}