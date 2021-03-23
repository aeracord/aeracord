import { Client, Emoji, RawReactionData, RawReactionMetadata } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveString from "./resolveString";

export interface ReactionData {
    messageID: string;
    channelID: string;
    guildID?: string | null;
    count: number;
    me: boolean;
    emoji: ReactionEmoji;
}

export interface ReactionEmoji {
    id: string | null;
    name: string | null;
    animated: boolean;
}

export type ReactionEmojiResolvable = Reaction | Emoji | string;

export default class Reaction {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Message ID
     *
     * The ID of the message this reaction is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this reaction is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this reaction is in
     */
    guildID?: string | null;

    /**
     * Count
     *
     * The amount of times this reaction has been used
     */
    count: number;

    /**
     * Me
     *
     * Whether or not the client has added this reaction
     */
    me: boolean;

    /**
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;

    /**
     * Reaction
     *
     * @param client The client
     * @param reactionData Options to initialize this reaction with
     * @param reactionData.count The amount of times this reaction has been used
     * @param reactionData.me Whether or not the client has added this reaction
     * @param reactionData.emoji The reaction's emoji
     */
    constructor(client: Client, reactionData: ReactionData) {

        // Set data
        this.client = client;
        this.messageID = reactionData.messageID;
        this.channelID = reactionData.channelID;
        this.guildID = reactionData.guildID;
        this.count = reactionData.count;
        this.me = reactionData.me;
        this.emoji = reactionData.emoji;
    }

    /**
     * From Raw Data
     *
     * Create a `ReactionData` object from a `RawReactionData` object
     *
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {ReactionData} The reaction data
     */
    static _fromRawData(rawData: RawReactionData, metadata: RawReactionMetadata): ReactionData {
        return fromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create a `Reaction` from a `ReactionData` object
     *
     * @param client The client
     * @param reactionData The reaction data
     *
     * @returns {Reaction} The reaction
     */
    static fromData(client: Client, reactionData: ReactionData): Reaction {
        return fromData(client, reactionData);
    }

    /**
     * Resolve String
     *
     * Resolve an object to a reaction emoji string (`name:id` or unicode character)
     *
     * @param reactionEmojiResolvable The emoji resolvable
     *
     * @returns {string | undefined} The resolved reaction emoji string, or `undefined` if the reaction emoji resolvable is invalid
     */
    static resolveString(reactionEmojiResolvable: ReactionEmojiResolvable): string | undefined {
        return resolveString(reactionEmojiResolvable);
    }
}