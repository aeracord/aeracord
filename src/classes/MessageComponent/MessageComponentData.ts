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
export type ComponentType = typeof COMPONENT_TYPE_ACTION_ROW | typeof COMPONENT_TYPE_BUTTON | typeof COMPONENT_TYPE_SELECT_MENU;
export const COMPONENT_TYPE_ACTION_ROW = 1;
export const COMPONENT_TYPE_BUTTON = 2;
export const COMPONENT_TYPE_SELECT_MENU = 3;

/**
 * Component Data
 *
 * A component that can be sent to the API
 */
export type Component = ActionRowComponent | ButtonComponent | SelectMenuComponent;

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
    style: ButtonStyle;

    /**
     * Label
     *
     * The button's label
     */
    label: string | number | boolean;

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
    customID: string | number | boolean;

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

/**
 * Select Menu Component
 *
 * A select menu component
 */
export interface SelectMenuComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof COMPONENT_TYPE_SELECT_MENU;

    /**
     * Placeholder
     *
     * The select menu's placeholder text
     */
    placeholder?: string | number | boolean;

    /**
     * Minimum Values
     *
     * The minimum amount of values that need to be selected
     */
    minimumValues?: number;

    /**
     * Maximum Values
     *
     * The maximum amount of values that can be selected
     */
    maximumValues?: number;

    /**
     * Custom ID
     *
     * The select menu's custom ID
     */
    customID: string | number | boolean;

    /**
     * Options
     *
     * The select menu's options
     */
    options: SelectMenuComponentOption[];
}

/**
 * Select Menu Component Option
 *
 * A select menu component option
 */
export interface SelectMenuComponentOption {

    /**
     * Label
     *
     * The options's label
     */
    label: string | number | boolean;

    /**
     * Description
     *
     * The options's description
     */
    description?: string | number | boolean;

    /**
     * Value
     *
     * The options's value
     */
    value: string | number | boolean;

    /**
     * Emoji
     *
     * The options's emoji
     */
    emoji?: string;

    /**
     * Default
     *
     * Whether or not the option is selected by default
     */
    default?: boolean;
}