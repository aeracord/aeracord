import { ComponentInteraction, ComponentInteractionData, Interaction } from "../../internal";

export default function updateObject(componentInteraction: ComponentInteraction, componentInteractionData: ComponentInteractionData, fromConstructor?: boolean) {

    // Set data
    componentInteraction.data = componentInteractionData.data;
    componentInteraction.message = componentInteractionData.message;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class component interactions extend
     */
    if (!fromConstructor) Interaction._updateObject(componentInteraction, componentInteractionData);
}