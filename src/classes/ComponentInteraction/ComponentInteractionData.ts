import { ComponentType, InteractionData, INTERACTION_TYPE_COMPONENT, MessageData } from "../../internal";

/**
 * Component Interaction Data
 *
 * Represents a `ComponentInteraction`
 */
export interface ComponentInteractionData extends InteractionData {

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
}

/**
 * Component Interaction Metadata
 *
 * A component interaction's data
 */
export interface ComponentInteractionMetadata {

    /**
     * Type
     *
     * The component's type
     */
    type: ComponentType;

    /**
     * Custom ID
     *
     * The component's custom ID
     */
    customID: string;
}