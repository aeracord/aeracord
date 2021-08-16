import { ComponentTypes, MessageComponentData } from "../../internal";

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
    type: typeof ComponentTypes.BUTTON;

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
    label: string;

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
    customID: string;

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
export type ButtonStyle = typeof ButtonStyles.PRIMARY | typeof ButtonStyles.SECONDARY | typeof ButtonStyles.SUCCESS | typeof ButtonStyles.DANGER | typeof ButtonStyles.LINK;
export const ButtonStyles: {

    /**
     * Primary
     *
     * A blurple button
     */
    PRIMARY: 1,

    /**
     * Secondary
     *
     * A gray button
     */
    SECONDARY: 2,

    /**
     * Success
     *
     * A green button
     */
    SUCCESS: 3,

    /**
     * Danger
     *
     * A red button
     */
    DANGER: 4,

    /**
     * Link
     *
     * A button that opens a link
     */
    LINK: 5
} = {
    PRIMARY: 1,
    SECONDARY: 2,
    SUCCESS: 3,
    DANGER: 4,
    LINK: 5
};

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