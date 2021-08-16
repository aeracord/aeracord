import { Base, Client, EmojiData, ModifyGuildEmojiData, RawEmojiData, ReadyStates, User } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Emoji Resolvable
 *
 * The types that can be resolved to an emoji
 */
export type EmojiResolvable = Emoji | EmojiData | string;

export default class Emoji extends Base<Emoji> {

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
     * @param emojiData.guildID The ID of the guild this emoji is in
     * @param emojiData.animated Whether or not this emoji is animated
     * @param emojiData.managed Whether or not this emoji is managed by an integration
     * @param emojiData.available Whether or not this emoji is available
     * @param emojiData.creator The user that created this emoji
     * @param emojiData.requiresColons Whether or not this emoji is requires colons
     * @param emojiData.roles The IDs of the roles that can use this emoji
     */
    constructor(client: Client, emojiData: EmojiData) {

        // Super
        super(client, {
            id: emojiData.id,
            cacheManager: client._emojis
        });

        // Set data
        Emoji._updateObject(this, emojiData);

        /**
         * Cache Emoji
         *
         * If we need to cache all emojis and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._emojis.cacheAll) && (client._readyState === ReadyStates.READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create an `EmojiData` object from a `RawEmojiData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this emoji is in
     *
     * @returns {Emoji} The emoji
     */
    static _fromRawData(client: Client, rawData: RawEmojiData, guildID: string): Emoji {
        return Emoji.fromData(client, Emoji._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create an `EmojiData` object from a `RawEmojiData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this emoji is in
     *
     * @returns {EmojiData} The emoji data
     */
    static _dataFromRawData(rawData: RawEmojiData, guildID: string): EmojiData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create an `Emoji` from an `EmojiData` object
     *
     * @param client The client
     * @param emojiData The emoji data
     *
     * @returns {Emoji} The emoji
     */
    static fromData(client: Client, emojiData: EmojiData): Emoji {
        return fromData(client, emojiData);
    }

    /**
     * To Data
     *
     * Create an `EmojiData` object from an `Emoji`
     *
     * @param emoji The emoji
     *
     * @returns {EmojiData} The emoji data
     */
    static toData(emoji: Emoji): EmojiData {
        return toData(emoji);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to an emoji ID
     *
     * @param emojiResolvable The emoji resolvable
     *
     * @returns {string | undefined} The resolved emoji ID, or `undefined` if the emoji resolvable is invalid
     */
    static resolveID(emojiResolvable: EmojiResolvable): string | undefined {
        return resolveID(emojiResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Emoji` object with data from a `EmojiData` object
     *
     * @private
     * @param emoji The emoji to update
     * @param emojiData The data to update this emoji with
     */
    static _updateObject(emoji: Emoji, emojiData: EmojiData) {
        updateObject(emoji, emojiData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Emoji` object with data from a `EmojiData` object if it's cached
     *
     * @private
     * @param client The client
     * @param emojiData The emoji data
     *
     * @returns {Emoji | undefined} The emoji
     */
    static _updateObjectFromData(client: Client, emojiData: EmojiData): Emoji | undefined {
        return updateObjectFromData(client, emojiData);
    }

    /**
     * Cache
     *
     * Cache this `Emoji`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._emojis.cache(this.id, this, expiresIn);
    }

    /**
     * Edit
     *
     * Edit this emoji
     *
     * @param modifyGuildEmojiData The data to modify the emoji
     * @param reason The reason for modifying this emoji
     *
     * @returns {Promise<Emoji>} The modified emoji
     */
    edit(modifyGuildEmojiData: ModifyGuildEmojiData, reason?: string): Promise<Emoji> {
        return this.client.modifyGuildEmoji(this.guildID, this, modifyGuildEmojiData, reason);
    }

    /**
     * Delete
     *
     * Delete this emoji
     *
     * @param reason The reason for deleting this emoji
     */
    delete(reason?: string): Promise<void> {
        return this.client.deleteGuildEmoji(this.guildID, this, reason);
    }
}