import { Embed, FollowupInteractionResponseData, Interaction, Message } from "../../internal";

export default function createFollowupMessage(interaction: Interaction, contentOrData: string | Embed | FollowupInteractionResponseData, followupInteractionResponseData: FollowupInteractionResponseData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") followupInteractionResponseData.content = contentOrData;
    else if (contentOrData instanceof Embed) followupInteractionResponseData.embeds = [contentOrData];
    else followupInteractionResponseData = contentOrData;

    // Create followup message
    return interaction.client.createFollowupMessage(interaction.token, followupInteractionResponseData);
}