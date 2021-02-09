import { Client, User } from "../../internal";

export interface EmojiData {
    id: string;
    name: string;
    animated?: boolean;
    managed?: boolean;
    available?: boolean;
    creator?: User;
    requiresColons?: boolean;
    roles: string[];
}

export default class Emoji {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
     */
    available: boolean;

    /**
     * Creator
     *
     * The user that created this emoji
     */
    creator?: User;

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
     * Emoji
     *
     * @param client The client
     * @param emojiData Options to initialize this emoji with
     * @param emojiData.id The emoji's ID
     * @param emojiData.name The emoji's name
     * @param emojiData.animated Whether or not this emoji is animated
     * @param emojiData.managed Whether or not this emoji is managed by an integration
     * @param emojiData.available Whether or not this emoji is available
     * @param emojiData.creator The user that created this emoji
     * @param emojiData.requiresColons Whether or not this emoji is requires colons
     * @param emojiData.roles The IDs of the roles that can use this emoji
     */
    constructor(client: Client, emojiData: EmojiData) {

        // Set data
        this.client = client;
        this.id = emojiData.id;
        this.name = emojiData.name;
        this.animated = Boolean(emojiData.animated);
        this.managed = Boolean(emojiData.managed);
        this.available = Boolean(emojiData.available);
        this.creator = emojiData.creator;
        this.requiresColons = Boolean(emojiData.requiresColons);
        this.roles = emojiData.roles;
    }

    /**
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => this.client._debug(info);
}