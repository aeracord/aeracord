import { UserData } from "../../internal";

/**
 * Emoji Data
 *
 * Represents an `Emoji`
 */
export interface EmojiData {

    /**
     * ID
     *
     * The emoji's ID
     */
    id: string;

    /**
     * Name
     *
     * The emoji's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this emoji is in
     */
    guildID: string;

    /**
     * Animated
     *
     * Whether or not this emoji is animated
     */
    animated: boolean;

    /**
     * Managed
     *
     * Whether or not this emoji is managed by an integration
     */
    managed: boolean;

    /**
     * Available
     *
     * Whether or not this emoji is available
     * Emojis can be unavailable due to losing server boosts
     */
    available: boolean;

    /**
     * Creator
     *
     * The user that created this emoji
     * Can be `undefined` if the bot doesn't have permission to manage emojis
     */
    creator?: UserData;

    /**
     * Requires Colons
     *
     * Whether or not this emoji is requires colons
     */
    requiresColons: boolean;

    /**
     * Roles
     *
     * The IDs of the roles that can use this emoji
     */
    roles: string[];

    /**
     * Fetched At
     *
     * The timestamp for when this emoji was fetched
     */
    fetchedAt: number;
}