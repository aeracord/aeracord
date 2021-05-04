import { AttachmentData, Base, ChannelMention, Client, CreateMessageData, EditMessageData, Embed, GetReactionsData, Member, MemberData, MessageActivity, MessageApplication, MessageData, MessageEmbedData, MessageInteraction, MessageReference, MessageType, MessageWebhook, RawMessageData, ReactionData, ReactionEmojiResolvable, READY_STATE_READY, StickerData, User, UserResolvable } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import edit from "./edit";
import fromData from "./fromData";
import reply from "./reply";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Message Resolvable
 *
 * The types that can be resolved to a message
 */
export type MessageResolvable = Message | MessageData | string;

export default class Message extends Base<Message> {

    /**
     * Type
     *
     * The message's type
     */
    type: MessageType;

    /**
     * Channel ID
     *
     * The ID of the channel this message is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this message is in
     */
    guildID: string | null;

    /**
     * Author
     *
     * The user that sent this message
     */
    author: User | null;

    /**
     * Webhook
     *
     * The webhook that sent this message
     */
    webhook: MessageWebhook | null;

    /**
     * Member
     *
     * The member object of the user that sent this message
     */
    member?: Member;

    /**
     * Content
     *
     * The message's content
     */
    content: string;

    /**
     * Timestamp
     *
     * The timestamp for when the message was sent
     */
    timestamp: number;

    /**
     * Edited Timestamp
     *
     * The timestamp for when the message was last edited
     */
    editedTimestamp: number | null;

    /**
     * TTS
     *
     * Whether or not this message is TTS
     */
    tts: boolean;

    /**
     * Mention Everyone
     *
     * Whether or not this message mentions everyone
     */
    mentionEveryone: boolean;

    /**
     * Mentions
     *
     * The members this message mentions
     */
    mentions: MemberData[];

    /**
     * Mentioned Roles
     *
     * The IDs of the roles this message mentions
     */
    mentionedRoles: string[];

    /**
     * Mentioned Channels
     *
     * The channels this message mentions
     */
    mentionedChannels: ChannelMention[];

    /**
     * Attachments
     *
     * The message's attachments
     */
    attachments: AttachmentData[];

    /**
     * Embeds
     *
     * The message's embeds
     */
    embeds: MessageEmbedData[];

    /**
     * Stickers
     *
     * The message's stickers
     */
    stickers: StickerData[];

    /**
     * Reactions
     *
     * The message's reactions
     */
    reactions: ReactionData[];

    /**
     * Pinned
     *
     * Whether or not this message is pinned
     */
    pinned: boolean;

    /**
     * Activity
     *
     * The message's activity
     */
    activity: MessageActivity | null;

    /**
     * Application
     *
     * The message's application
     */
    application: MessageApplication | null;

    /**
     * Message Reference
     *
     * The data for the message this message references
     */
    messageReference: MessageReference | null;

    /**
     * Flags
     *
     * The message's flags
     */
    flags: number;

    /**
     * Referenced Message
     *
     * The message this message references
     */
    referencedMessage?: MessageData | null;

    /**
     * Interaction
     *
     * The interaction this message is in response to
     */
    interaction: MessageInteraction | null;

    /**
     * Message
     *
     * @param client The client
     * @param messageData Options to initialize this message with
     * @param messageData.id The message's ID
     * @param messageData.type The message's type
     * @param messageData.channelID The ID of the channel this message is in
     * @param messageData.guildID The ID of the guild this message is in
     * @param messageData.author The user that sent this message
     * @param messageData.webhook The webhook that sent this message
     * @param messageData.member The member object of the user that sent this message
     * @param messageData.content The message's content
     * @param messageData.timestamp The timestamp for when the message was sent
     * @param messageData.editedTimestamp The timestamp for when the message was last edited
     * @param messageData.tts Whether or not this message is TTS
     * @param messageData.mentionEveryone Whether or not this message mentions everyone
     * @param messageData.mentions The members this message mentions
     * @param messageData.mentionedRoles The IDs of the roles this message mentions
     * @param messageData.mentionedChannels The channels this message mentions
     * @param messageData.attachments The message's attachments
     * @param messageData.embeds The message's embeds
     * @param messageData.stickers The message's stickers
     * @param messageData.reactions The message's reactions
     * @param messageData.pinned Whether or not this message is pinned
     * @param messageData.activity The message's activity
     * @param messageData.application The message's application
     * @param messageData.messageReference The data for the message this message references
     * @param messageData.flags The message's flags
     * @param messageData.referencedMessage The message this message references
     * @param messageData.interaction The interaction this message is in response to
     */
    constructor(client: Client, messageData: MessageData) {

        // Super
        super(client, {
            id: messageData.id,
            cacheManager: client._messages
        });

        // Set data
        Message._updateObject(this, messageData);

        /**
         * Cache Message
         *
         * If we need to cache all bans and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._messages.cacheAll && client._readyState === READY_STATE_READY) this.client._messages.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `MessageData` object from a `RawMessageData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Message} The message
     */
    static _fromRawData(client: Client, rawData: RawMessageData): Message {
        return Message.fromData(client, Message._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `MessageData` object from a `RawMessageData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {MessageData} The message data
     */
    static _dataFromRawData(rawData: RawMessageData): MessageData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Message` from a `MessageData` object
     *
     * @param client The client
     * @param messageData The message data
     *
     * @returns {Message} The message
     */
    static fromData(client: Client, messageData: MessageData): Message {
        return fromData(client, messageData);
    }

    /**
     * To Data
     *
     * Create a `MessageData` object from a `Message`
     *
     * @param message The message
     *
     * @returns {MessageData} The message data
     */
    static toData(message: Message): MessageData {
        return toData(message);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a message ID
     *
     * @param messageResolvable The message resolvable
     *
     * @returns {string | undefined} The resolved message ID, or `undefined` if the message resolvable is invalid
     */
    static resolveID(messageResolvable: MessageResolvable): string | undefined {
        return resolveID(messageResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Message` object with data from a `MessageData` object
     *
     * @private
     * @param message The message to update
     * @param messageData The data to update this message with
     */
    static _updateObject(message: Message, messageData: MessageData) {
        updateObject(message, messageData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Message` object with data from a `MessageData` object if it's cached
     *
     * @private
     * @param client The client
     * @param messageData The message data
     *
     * @returns {Message | undefined} The message
     */
    static _updateObjectFromData(client: Client, messageData: MessageData): Message | undefined {
        return updateObjectFromData(client, messageData);
    }

    /**
     * Cache
     *
     * Cache this `Message`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._messages.cache(this.id, this, expiresIn);
    }

    /**
     * Pin
     *
     * Pin this message
     *
     * @param reason The reason for pinning this message
     */
    pin(reason?: string): Promise<void> {
        return this.client.addPinnedChannelMessage(this.channelID, this, reason);
    }

    /**
     * React
     *
     * Add a reaction to this message
     *
     * @param reactionEmoji The emoji to react with
     */
    react(reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.createReaction(this.channelID, this, reactionEmoji);
    }

    /**
     * Reply
     *
     * Reply to this message
     *
     * @param contentOrData The content or data for the message
     * @param createMessageData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    reply(contentOrData: string | Embed | CreateMessageData, createMessageData?: CreateMessageData): Promise<Message> {
        return reply(this, contentOrData, createMessageData);
    }

    /**
     * Crosspost
     *
     * Publish this message
     *
     * @returns {Promise<Message>} The crossposted message
     */
    crosspost(): Promise<Message> {
        return this.client.crosspostMessage(this.channelID, this);
    }

    /**
     * Delete All Reactions
     *
     * Remove all reactions from this message
     */
    deleteAllReactions(): Promise<void> {
        return this.client.deleteAllReactions(this.channelID, this);
    }

    /**
     * Delete All Reactions for Emoji
     *
     * Remove all reactions from this message for a specific emoji
     *
     * @param reactionEmoji The emoji to delete reactions for
     */
    deleteAllReactionsForEmoji(reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.deleteAllReactionsForEmoji(this.channelID, this, reactionEmoji);
    }

    /**
     * Delete
     *
     * Delete this message
     *
     * @param reason The reason for deleting this message
     */
    delete(reason?: string): Promise<void> {
        return this.client.deleteMessage(this.channelID, this, reason);
    }

    /**
     * Delete Own Reaction
     *
     * Remove the client's reaction from this message
     *
     * @param reactionEmoji The emoji to unreact with
     */
    deleteOwnReaction(reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return this.client.deleteOwnReaction(this.channelID, this, reactionEmoji);
    }

    /**
     * Unpin
     *
     * Unpin this message
     *
     * @param reason The reason for unpinning this message
     */
    unpin(reason?: string): Promise<void> {
        return this.client.deletePinnedChannelMessage(this.channelID, this, reason);
    }

    /**
     * Delete User Reaction
     *
     * Remove a user's reaction from this message
     *
     * @param reactionEmoji The emoji to unreact with
     * @param user The user to delete the reaction for
     */
    deleteUserReaction(reactionEmoji: ReactionEmojiResolvable, user: UserResolvable): Promise<void> {
        return this.client.deleteUserReaction(this.channelID, this, reactionEmoji, user);
    }

    /**
     * Edit
     *
     * Edit this message
     *
     * @param contentOrEmbed The content or embed for the message
     * @param editMessageData The data for editing the message
     *
     * @returns {Promise<Message>} The edited message
     */
    edit(contentOrEmbed: string | Embed | undefined, editMessageData?: EditMessageData): Promise<Message> {
        return edit(this, this.channelID, contentOrEmbed, editMessageData);
    }

    /**
     * Get Reactions
     *
     * Get the users that reacted to this message with a specific emoji
     *
     * @param reactionEmoji The emoji to get the reactions for
     * @param getReactionsData The data for getting reactions
     *
     * @returns {Promise<User[]>} The users
     */
    getReactions(reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<User[]> {
        return this.client.getReactions(this.channelID, this, reactionEmoji, getReactionsData);
    }
}