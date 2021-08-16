import { ComponentTypes, MessageComponentData } from "../../internal";

/**
 * Select Menu Data
 *
 * Represents a `SelectMenu`
 */
export interface SelectMenuData extends MessageComponentData {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.SELECT_MENU;

    /**
     * Placeholder
     *
     * The select menu's placeholder text
     */
    placeholder?: string;

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
    customID: string;

    /**
     * Options
     *
     * The select menu's options
     */
    options: SelectMenuOption[];
}

/**
 * Select Menu Option
 *
 * A select menu option
 */
export interface SelectMenuOption {

    /**
     * Label
     *
     * The options's label
     */
    label: string;

    /**
     * Description
     *
     * The options's description
     */
    description?: string;

    /**
     * Value
     *
     * The options's value
     */
    value: string;

    /**
     * Emoji
     *
     * The options's emoji
     */
    emoji?: SelectMenuOptionEmoji;

    /**
     * Default
     *
     * Whether or not the option is selected by default
     */
    default: boolean;
}

/**
 * Select Menu Option Emoji
 *
 * A select menu option emoji
 */
export interface SelectMenuOptionEmoji {

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