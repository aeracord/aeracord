import { AnyInteraction, AnyInteractionData, Client, CommandInteraction, CommandInteractionData, ComponentInteraction, ComponentInteractionData, INTERACTION_TYPE_COMMAND, INTERACTION_TYPE_COMPONENT } from "../../internal";

export default function updateObjectFromData(client: Client, interactionData: AnyInteractionData) {

    // Get interaction from cache
    let interaction: AnyInteraction | undefined = client.interactions.get(interactionData.id);

    // Update interaction object
    if (interaction) {

        // Command interaction
        if (interaction.type === INTERACTION_TYPE_COMMAND) CommandInteraction._updateObject(interaction as CommandInteraction, interactionData as CommandInteractionData);

        // Component interaction
        else if (interaction.type === INTERACTION_TYPE_COMPONENT) ComponentInteraction._updateObject(interaction as ComponentInteraction, interactionData as ComponentInteractionData);

        // Unknown interaction type
        else throw new Error(`Unknown interaction type '${interactionData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }
}