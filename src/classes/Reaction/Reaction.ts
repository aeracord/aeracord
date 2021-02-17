import { Client } from "../../internal";

export interface ReactionData {
    count: number;
    me?: boolean;
    emoji: ReactionEmoji;
}

export interface ReactionEmoji {
    id?: string;
    name?: string;
    animated: boolean;
}

export default class Reaction {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
        this.count = reactionData.count;
        this.me = Boolean(reactionData.me);
        this.emoji = reactionData.emoji;
    }
}