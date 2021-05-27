import { ButtonStyle } from "../../internal";

/**
 * Message Component Data
 *
 * Represents a `MessageComponent`
 */
export interface MessageComponentData {

    /**
     * Type
     *
     * The component's type
     */
    type: ComponentType;

    /**
     * Message ID
     *
     * The ID of the message this component is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this component is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this component is in
     * `null` if the component is sent in a DM channel
     */
    guildID?: string | null;
}

/**
 * Component Type
 * https://discord.com/developers/docs/interactions/message-components#component-types
 */
export type ComponentType = typeof COMPONENT_TYPE_ACTION_ROW | typeof COMPONENT_TYPE_BUTTON;
export const COMPONENT_TYPE_ACTION_ROW = 1;
export const COMPONENT_TYPE_BUTTON = 2;

/**
 * Component Data
 *
 * A component that can be sent to the API
 */
export type Component = ActionRowComponent | ButtonComponent;

/**
 * Action Row Component
 *
 * An action row component
 */
export interface ActionRowComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof COMPONENT_TYPE_ACTION_ROW;

    /**
     * Components
     *
     * The components
     */
    components: Component[];
}

/**
 * Button Component
 *
 * A button component
 */
export interface ButtonComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof COMPONENT_TYPE_BUTTON;

    /**
     * Style
     *
     * The button's style
     */
    style?: ButtonStyle;

    /**
     * Label
     *
     * The button's label
     */
    label?: string | number | boolean;

    /**
     * Emoji
     *
     * The button's emoji
     */
    emoji?: string;

    /**
     * Custom ID
     *
     * The button's custom ID
     */
    customID?: string | number | boolean;

    /**
     * URL
     *
     * The button's url
     */
    url?: string;

    /**
     * Disabled
     *
     * Whether or not the button is disabled
     */
    disabled?: boolean;
}