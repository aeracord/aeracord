import { AnyChannel, AnyInteraction, CacheInterface, Channel, Client, CreateMessageData, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_TEXT, EditMessageData, Embed, GetChannelMessagesData, GetReactionsData, Message, MessageResolvable, ReactionEmojiResolvable, TextBasedChannelData, ThreadChannelType, User, UserResolvable } from "../../internal";
import createReply from "./createReply";
import editMessage from "./editMessage";
import send from "./send";
import updateObject from "./updateObject";

export type TextBasedChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_DM | typeof CHANNEL_TYPE_NEWS | ThreadChannelType;

export default class TextBasedChannel extends Channel {

    /**
     * Type
     *
     * The channel's type
     */
    type: TextBasedChannelType;

    /**
     * Interactions
     *
     * The cache interface for the interactions in this channel
     */
    interactions: CacheInterface<AnyInteraction, false>;

    /**
     * Messages
     *
     * The cache interface for the messages in this channel
     */
    messages: CacheInterface<Message>;

    /**
     * Last Message ID
     *
     * The ID of the last message in this channel
     * `null` if there aren't any messages
     */
    lastMessageID: string | null;

    /**
     * Last Pin Timestamp
     *
     * The timestamp of when the last pin in this channel was
     * `null` if there aren't any pinned messages
     */
    lastPinTimestamp: number | null;

    /**
     * Text Based Channel
     *
     * @param client The client
     * @param textBasedChannelData Options to initialize this text based channel with
     * @param textBasedChannelData.lastMessageID The ID of the last message in this channel
     * @param textBasedChannelData.lastPinTimestamp The timestamp of when the last pin in this channel was
     */
    constructor(client: Client, textBasedChannelData: TextBasedChannelData) {

        // Super
        super(client, textBasedChannelData);

        // Set data
        TextBasedChannel._updateObject(this, textBasedChannelData, true);
        Object.defineProperty(this, "interactions", {
            value: new CacheInterface<AnyInteraction, false>(this.client, {
                cacheManager: this.client._interactions,
                match: (i: AnyInteraction) => i.channelID === this.id
            })
        });
        Object.defineProperty(this, "messages", {
            value: new CacheInterface<Message>(this.client, {
                cacheManager: this.client._messages,
                match: (m: Message) => m.channelID === this.id,
                fetchObject: async (id: string): Promise<Message | undefined> => await this.client.getChannelMessage(this.id, id)
            })
        });
    }

    /**
     * Update Object
     *
     * Update the `TextBasedChannel` object with data from a `TextBasedChannelData` object
     *
     * @private
     * @param textBasedChannel The text based channel to update
     * @param textBasedChannelData The data to update the text based channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(textBasedChannel: TextBasedChannel, textBasedChannelData: TextBasedChannelData, fromConstructor?: boolean) {
        updateObject(textBasedChannel, textBasedChannelData, fromConstructor);
    }

    /**
     * Pin Message
     *
     * Pin a message to this channel
     *
     * @param message The message to pin
     * @param reason The reason for pinning the message
     */
    pinMessage(message: MessageResolvable, reason?: string): Promise<void> {
        return this.client.addPinnedChannelMessage(this as unknown as AnyChannel, message, reason);
    }

    /**
     * Bulk Delete
     *
     * Bulk delete messages from this channel
     *
     * @param messages The messages to bulk delete
     * @param reason The reason for bulk deleting the messages
     */
    bulkDelete(messages: MessageResolvable[], reason?: string): Promise<void> {
        return this.client.bulkDeleteMessages(this as unknown as AnyChannel, { messages }, reason);
    }

    /**
     * Send
     *
     * Send a message in this channel
     *
     * @param contentOrData The content or data for the message
     * @param createMessageData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    send(contentOrData: string | Embed | CreateMessageData, createMessageData?: CreateMessageData): Promise<Message> {
        return send(this, contentOrData, createMessageData);
    }

    /**
     * Create Reply
     *
     * Reply to a message in this channel
     *
     * @param message The message to reply to
     * @param contentOrData The content or data for the message
     * @param createMessageData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    createReply(message: MessageResolvable, contentOrData: string | Embed | CreateMessageData, createMessageData?: CreateMessageData): Promise<Message> {
        return createReply(this, message, contentOrData, createMessageData);
    }

    /**
     * Create Reaction
     *
     * Add a reaction to a message in this channel
     *
     * @param message The message to create the reaction on
     * @param reactionEmoji The emoji to react with
     */
    createReaction(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.createReaction(this as unknown as AnyChannel, message, reactionEmoji);
    }

    /**
     * Delete All Reactions
     *
     * Remove all reactions from a message in this channel
     *
     * @param message The message to create the reaction on
     */
    deleteAllReactions(message: MessageResolvable): Promise<void> {
        return this.client.deleteAllReactions(this as unknown as AnyChannel, message);
    }

    /**
     * Delete All Reactions for Emoji
     *
     * Remove all reactions from a message in this channel for a specific emoji
     *
     * @param message The message to create the reaction on
     * @param reactionEmoji The emoji to delete reactions for
     */
    deleteAllReactionsForEmoji(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.deleteAllReactionsForEmoji(this as unknown as AnyChannel, message, reactionEmoji);
    }

    /**
     * Delete Message
     *
     * Delete a message in this channel
     *
     * @param message The message to delete
     * @param reason The reason for deleting the message
     */
    deleteMessage(message: MessageResolvable, reason?: string): Promise<void> {
        return this.client.deleteMessage(this as unknown as AnyChannel, message, reason);
    }

    /**
     * Delete Own Reaction
     *
     * Remove the client's reaction from a message in this channel
     *
     * @param message The message to delete the reaction from
     * @param reactionEmoji The emoji to unreact with
     */
    deleteOwnReaction(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.deleteOwnReaction(this as unknown as AnyChannel, message, reactionEmoji);
    }

    /**
     * Unpin Message
     *
     * Unpin a message from this channel
     *
     * @param message The message to unpin
     * @param reason The reason for unpinning the message
     */
    unpinMessage(message: MessageResolvable, reason?: string): Promise<void> {
        return this.client.deletePinnedChannelMessage(this as unknown as AnyChannel, message, reason);
    }

    /**
     * Delete User Reaction
     *
     * Remove a user's reaction from a message in this channel
     *
     * @param message The message to delete the reaction from
     * @param reactionEmoji The emoji to unreact with
     * @param user The user to delete the reaction for
     */
    deleteUserReaction(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, user: UserResolvable): Promise<void> {
        return this.client.deleteUserReaction(this as unknown as AnyChannel, message, reactionEmoji, user);
    }

    /**
     * Edit Message
     *
     * Edit a message in this channel
     *
     * @param message The message to edit
     * @param contentOrEmbed The content or embed for the message
     * @param editMessageData The data for editing the message
     *
     * @returns {Promise<Message>} The edited message
     */
    editMessage(message: MessageResolvable, contentOrEmbed: string | Embed | undefined, editMessageData?: EditMessageData): Promise<Message> {
        return editMessage(this, message, contentOrEmbed, editMessageData);
    }

    /**
     * Get Message
     *
     * Get a message from this channel
     *
     * @param message The message to get
     *
     * @returns {Promise<Message>} The message
     */
    getMessage(message: MessageResolvable): Promise<Message | undefined> {
        return this.client.getChannelMessage(this as unknown as AnyChannel, message);
    }

    /**
     * Get Messages
     *
     * Get messages from this channel
     *
     * @param getChannelMessagesData The data for getting messages
     *
     * @returns {Promise<Message[]>} The messages
     */
    getMessages(getChannelMessagesData?: GetChannelMessagesData): Promise<Message[]> {
        return this.client.getChannelMessages(this as unknown as AnyChannel, getChannelMessagesData);
    }

    /**
     * Get Pinned Messages
     *
     * Get the pinned messages in this channel
     *
     * @returns {Promise<Message[]>} The messages
     */
    getPinnedMessages(): Promise<Message[]> {
        return this.client.getPinnedMessages(this as unknown as AnyChannel);
    }

    /**
     * Get Reactions
     *
     * Get the users that reacted to a message in this channel with a specific emoji
     *
     * @param message The message to get the reactions from
     * @param reactionEmoji The emoji to get the reactions for
     * @param getReactionsData The data for getting reactions
     *
     * @returns {Promise<User[]>} The users
     */
    getReactions(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<User[]> {
        return this.client.getReactions(this as unknown as AnyChannel, message, reactionEmoji, getReactionsData);
    }

    /**
     * Start Typing
     *
     * Start typing in this channel
     */
    startTyping(): Promise<void> {
        return this.client.triggerTypingIndicator(this as unknown as AnyChannel);
    }
}