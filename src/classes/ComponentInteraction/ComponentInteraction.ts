import { Client, ComponentInteractionData, ComponentInteractionMetadata, CreateInteractionMessageData, Embed, Interaction, InteractionResponseTypes, InteractionTypes, Message, MessageData } from "../../internal";
import updateMessage from "./updateMessage";
import updateObject from "./updateObject";

/**
 * Component Interaction
 *
 * Represents a component interaction that the client receives
 * For example, a button or select menu being used
 */
export default class ComponentInteraction extends Interaction {

    /**
     * Type
     *
     * The interaction's type
     */
    type: typeof InteractionTypes.COMPONENT;

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

    /**
     * Update Message
     *
     * Respond to this interaction by updating the component's message
     *
     * @param contentOrData The content or data for the response
     * @param createInteractionMessageData The data for the response
     *
     * @returns {Promise<Message>} The updated message
     */
    updateMessage(contentOrData: string | Embed | CreateInteractionMessageData, createInteractionMessageData?: CreateInteractionMessageData): Promise<Message | undefined> {
        return updateMessage(this, contentOrData, createInteractionMessageData);
    }

    /**
     * Defer Update
     *
     * Defer the message update response to this interaction
     *
     * @returns {Promise<Message>} The created response
     */
    deferUpdate(): Promise<Message | undefined> {
        return this.client.createInteractionResponse(this, this.token, { type: InteractionResponseTypes.DEFERRED_MESSAGE_UPDATE });
    }
}