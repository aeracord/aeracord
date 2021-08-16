import { AnyInteraction, AnyInteractionData, Client, CommandInteraction, CommandInteractionData, ComponentInteraction, ComponentInteractionData, InteractionTypes } from "../../internal";

export default function fromData(client: Client, interactionData: AnyInteractionData): AnyInteraction {

    // Define interaction
    let interaction: AnyInteraction;

    // Create command interaction
    if (interactionData.type === InteractionTypes.COMMAND) interaction = new CommandInteraction(client, interactionData as CommandInteractionData);

    // Create component interaction
    else if (interactionData.type === InteractionTypes.COMPONENT) interaction = new ComponentInteraction(client, interactionData as ComponentInteractionData);

    // Unknown interaction type
    else throw new Error(`Unknown interaction type '${interactionData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return interaction;
}