import { COMPONENT_TYPE_BUTTON, MessageComponentData } from "../../internal";

/**
 * Button Data
 *
 * Represents a `Button`
 */
export interface ButtonData extends MessageComponentData {

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
    label?: string;

    /**
     * Emoji
     *
     * The button's emoji
     */
    emoji?: ButtonEmoji;

    /**
     * Custom ID
     *
     * The button's custom ID
     */
    customID?: string;

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
    disabled: boolean;
}

/**
 * Button Style
 * https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
 */
export type ButtonStyle = typeof BUTTON_STYLE_PRIMARY | typeof BUTTON_STYLE_SECONDARY | typeof BUTTON_STYLE_SUCCESS | typeof BUTTON_STYLE_DANGER | typeof BUTTON_STYLE_LINK;
export const BUTTON_STYLE_PRIMARY = 1;
export const BUTTON_STYLE_SECONDARY = 2;
export const BUTTON_STYLE_SUCCESS = 3;
export const BUTTON_STYLE_DANGER = 4;
export const BUTTON_STYLE_LINK = 5;

/**
 * Button Emoji
 *
 * A button emoji
 */
export interface ButtonEmoji {

    /**
     * ID
     *
     * The emoji's ID
     */
    id: string | null;

    /**
     * Name
     *
     * The emoji's name
     */
    name: string | null;

    /**
     * Animated
     *
     * Whether or not the emoji is animated
     */
    animated: boolean;
}