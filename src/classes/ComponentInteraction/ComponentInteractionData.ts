import { ComponentTypes, InteractionData, InteractionTypes, MessageData } from "../../internal";

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
}

/**
 * Component Interaction Metadata
 *
 * A component interaction's data
 */
export type ComponentInteractionMetadata = ButtonInteractionMetadata | SelectMenuInteractionMetadata;

/**
 * Button Interaction Metadata
 *
 * A button interaction's data
 */
export interface ButtonInteractionMetadata {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.BUTTON;

    /**
     * Custom ID
     *
     * The button's custom ID
     */
    customID: string;
}

/**
 * Select Menu Interaction Metadata
 *
 * A select menu interaction's data
 */
export interface SelectMenuInteractionMetadata {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.SELECT_MENU;

    /**
     * Custom ID
     *
     * The select menu's custom ID
     */
    customID: string;

    /**
     * Values
     *
     * The values that were selected
     */
    values: string[];
}