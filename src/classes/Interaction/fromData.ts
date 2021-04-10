import { Client, Interaction, InteractionData } from "../../internal";

export default function fromData(client: Client, interactionData: InteractionData): Interaction {

    // Update cached interaction
    let interaction: Interaction | undefined = Interaction._updateObjectFromData(client, interactionData);

    // Create interaction
    if (!interaction) interaction = new Interaction(client, interactionData);

    // Return
    return interaction;
}