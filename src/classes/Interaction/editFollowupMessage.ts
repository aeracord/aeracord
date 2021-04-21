import { EditInteractionResponseData, Interaction, Message, MessageEmbed, MessageResolvable } from "../../internal";

export default function editFollowupMessage(interaction: Interaction, message: MessageResolvable, contentOrData: string | MessageEmbed | EditInteractionResponseData, editInteractionResponseData: EditInteractionResponseData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") editInteractionResponseData.content = contentOrData;
    else if (contentOrData instanceof MessageEmbed) editInteractionResponseData.embeds = [contentOrData];
    else editInteractionResponseData = contentOrData;

    // Edit response
    return interaction.client.editFollowupMessage(interaction.token, message, editInteractionResponseData);
}