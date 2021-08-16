import { AnyInteraction, AnyInteractionData, Client, CommandInteraction, CommandInteractionData, ComponentInteraction, ComponentInteractionData, InteractionTypes } from "../../internal";

export default function updateObjectFromData(client: Client, interactionData: AnyInteractionData): AnyInteraction | undefined {

    // Get interaction from cache
    let interaction: AnyInteraction | undefined = client.interactions.get(interactionData.id);

    // Update interaction object
    if (interaction) {

        // Command interaction
        if (interaction.type === InteractionTypes.COMMAND) CommandInteraction._updateObject(interaction as CommandInteraction, interactionData as CommandInteractionData);

        // Component interaction
        else if (interaction.type === InteractionTypes.COMPONENT) ComponentInteraction._updateObject(interaction as ComponentInteraction, interactionData as ComponentInteractionData);

        // Unknown interaction type
        else throw new Error(`Unknown interaction type '${interactionData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return interaction;
}