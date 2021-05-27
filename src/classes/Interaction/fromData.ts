import { AnyInteraction, AnyInteractionData, Client, CommandInteraction, CommandInteractionData, ComponentInteraction, ComponentInteractionData, INTERACTION_TYPE_COMMAND, INTERACTION_TYPE_COMPONENT } from "../../internal";

export default function fromData(client: Client, interactionData: AnyInteractionData): AnyInteraction {

    // Define interaction
    let interaction: AnyInteraction;

    // Create command interaction
    if (interactionData.type === INTERACTION_TYPE_COMMAND) interaction = new CommandInteraction(client, interactionData as CommandInteractionData);

    // Create component interaction
    else if (interactionData.type === INTERACTION_TYPE_COMPONENT) interaction = new ComponentInteraction(client, interactionData as ComponentInteractionData);

    // Unknown interaction type
    else throw new Error(`Unknown interaction type '${interactionData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return interaction;
}