import { Client, Interaction, InteractionData } from "../../internal";

export default function updateObjectFromData(client: Client, interactionData: InteractionData): Interaction | undefined {

    // Get interaction from cache
    let interaction: Interaction | undefined = client.interactions.get(interactionData.id);

    // Update interaction object
    if (interaction) Interaction._updateObject(interaction, interactionData);

    // Return
    return interaction;
}