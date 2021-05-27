import { CommandInteraction, CommandInteractionData, Interaction } from "../../internal";

export default function updateObject(commandInteraction: CommandInteraction, commandInteractionData: CommandInteractionData, fromConstructor?: boolean) {

    // Set data
    commandInteraction.data = commandInteractionData.data;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class command interactions extend
     */
    if (!fromConstructor) Interaction._updateObject(commandInteraction, commandInteractionData);
}