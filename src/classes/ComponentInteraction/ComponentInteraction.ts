import { Client, ComponentInteractionData, ComponentInteractionMetadata, Interaction, INTERACTION_TYPE_COMPONENT, MessageData } from "../../internal";
import updateObject from "./updateObject";

export default class ComponentInteraction extends Interaction {

    /**
     * Type
     *
     * The interaction's type
     */
    type: typeof INTERACTION_TYPE_COMPONENT;

    /**
     * Data
     *
     * The component interaction's data
     */
    data: ComponentInteractionMetadata;

    /**
     * Message
     *
     * The message that this interaction is from
     * Only set for components
     */
    message: MessageData;

    /**
     * Component Interaction
     *
     * @param client The client
     * @param componentInteractionData Options to initialize this component interaction with
     * @param componentInteractionData.recipient The ID of the user this DM is with
     */
    constructor(client: Client, componentInteractionData: ComponentInteractionData) {

        // Super
        super(client, componentInteractionData);

        // Set data
        ComponentInteraction._updateObject(this, componentInteractionData, true);
    }

    /**
     * Update Object
     *
     * Update the `ComponentInteraction` object with data from a `ComponentInteractionData` object
     *
     * @private
     * @param componentInteraction The component interaction to update
     * @param componentInteractionData The data to update the component interaction with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(componentInteraction: ComponentInteraction, componentInteractionData: ComponentInteractionData, fromConstructor?: boolean) {
        updateObject(componentInteraction, componentInteractionData, fromConstructor);
    }
}