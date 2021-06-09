import { CreateInteractionMessageData, Embed, Interaction, Message } from "../../internal";

export default function createFollowupMessage(interaction: Interaction, contentOrData: string | Embed | CreateInteractionMessageData, createInteractionMessageData: CreateInteractionMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") createInteractionMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createInteractionMessageData.embeds = [contentOrData];
    else createInteractionMessageData = contentOrData;

    // Create followup message
    return interaction.client.createFollowupMessage(interaction.token, createInteractionMessageData);
}