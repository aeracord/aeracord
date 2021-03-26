import { CacheManagerInterface, Channel, ChannelData, Client, CreateMessageData, EditMessageData, Embed, GetChannelMessagesData, GetReactionsData, Message, MessageData, MessageResolvable, ReactionEmojiResolvable, UserData, UserResolvable, WebhookData } from "../../internal";
import editMessage from "./editMessage";
import send from "./send";
import updateObject from "./updateObject";

export interface TextBasedChannelData extends ChannelData {
    lastMessageID: string | null;
    lastPinTimestamp: number | null;
}

export default class TextBasedChannel extends Channel {

    /**
     * Messages
     *
     * The cache manager interface for the messages in this channel
     */
    messages: CacheManagerInterface<Message>;

    /**
     * Last Message ID
     *
     * The ID of the last message in this channel
     */
    lastMessageID: string | null;

    /**
     * Last Pin Timestamp
     *
     * The timestamp of when the last pin in this channel was
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
        this.messages = new CacheManagerInterface<Message>(this.client, {
            cacheManager: this.client._messages,
            match: (m: Message) => m.channelID === this.id,
            fetchObject: async (id: string): Promise<Message> => Message.fromData(this.client, await this.client.getChannelMessage(this.id, id))
        });
    }

    /**
     * Update Object
     *
     * Update the `TextBasedChannel` object with data from a `TextBasedChannelData` object
     *
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
     */
    pinMessage(message: MessageResolvable): Promise<void> {
        return this.client.addPinnedChannelMessage(this, message);
    }

    /**
     * Bulk Delete
     *
     * Bulk delete messages from this channel
     *
     * @param messages The messages to bulk delete
     */
    bulkDelete(messages: MessageResolvable[]): Promise<void> {
        return this.client.bulkDeleteMessages(this, { messages });
    }

    /**
     * Send
     *
     * Send a message in this channel
     *
     * @param contentOrEmbed The content or embed for the message
     * @param createMessageData The data for the message
     *
     * @returns {Promise<MessageData>} The created message's data
     */
    send(contentOrEmbed: string | Embed | undefined, createMessageData?: CreateMessageData): Promise<MessageData> {
        return send(this, contentOrEmbed, createMessageData);
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
        return this.client.createReaction(this, message, reactionEmoji);
    }

    /**
     * Delete All Reactions
     *
     * Remove all reactions from a message in this channel
     *
     * @param message The message to create the reaction on
     */
    deleteAllReactions(message: MessageResolvable): Promise<void> {
        return this.client.deleteAllReactions(this, message);
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
        return this.client.deleteAllReactionsForEmoji(this, message, reactionEmoji);
    }

    /**
     * Delete Message
     *
     * Delete a message in this channel
     *
     * @param message The message to delete
     */
    deleteMessage(message: MessageResolvable): Promise<void> {
        return this.client.deleteMessage(this, message);
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
        return this.client.deleteOwnReaction(this, message, reactionEmoji);
    }

    /**
     * Unpin Message
     *
     * Unpin a message from this channel
     *
     * @param message The message to unpin
     */
    unpinMessage(message: MessageResolvable): Promise<void> {
        return this.client.deletePinnedChannelMessage(this, message);
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
        return this.client.deleteUserReaction(this, message, reactionEmoji, user);
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
     * @returns {Promise<MessageData>} The edited message's data
     */
    editMessage(message: MessageResolvable, contentOrEmbed: string | Embed | undefined, editMessageData?: EditMessageData): Promise<MessageData> {
        return editMessage(this, message, contentOrEmbed, editMessageData);
    }

    /**
     * Get Message
     *
     * Get a message from this channel
     *
     * @param message The message to get
     *
     * @returns {Promise<MessageData>} The message data
     */
    getMessage(message: MessageResolvable): Promise<MessageData> {
        return this.client.getChannelMessage(this, message);
    }

    /**
     * Get Messages
     *
     * Get messages from this channel
     *
     * @param getChannelMessagesData The data for getting messages
     *
     * @returns {Promise<MessageData[]>} The messages
     */
    getMessages(getChannelMessagesData?: GetChannelMessagesData): Promise<MessageData[]> {
        return this.client.getChannelMessages(this, getChannelMessagesData);
    }

    /**
     * Get Webhooks
     *
     * Get the webhooks in this channel
     *
     * @returns {Promise<WebhookData[]>} The channel's webhooks
     */
    getWebhooks(): Promise<WebhookData[]> {
        return this.client.getChannelWebhooks(this);
    }

    /**
     * Get Pinned Messages
     *
     * Get the pinned messages in this channel
     *
     * @returns {Promise<MessageData[]>} The messages
     */
    getPinnedMessages(): Promise<MessageData[]> {
        return this.client.getPinnedMessages(this);
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
     * @returns {Promise<UserData[]>} The users
     */
    getReactions(message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<UserData[]> {
        return this.client.getReactions(this, message, reactionEmoji, getReactionsData);
    }

    /**
     * Start Typing
     *
     * Start typing in this channel
     */
    startTyping(): Promise<void> {
        return this.client.triggerTypingIndicator(this);
    }
}