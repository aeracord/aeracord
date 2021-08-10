import { Base, BaseEditMessageData, Client, CommandInteraction, CommandInteractionData, ComponentInteraction, ComponentInteractionData, CreateInteractionMessageData, Embed, InteractionData, InteractionMetadata, InteractionType, INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE, Member, Message, MessageResolvable, RawInteractionData, READY_STATE_READY, User } from "../../internal";
import createFollowupMessage from "./createFollowupMessage";
import dataFromRawData from "./dataFromRawData";
import editFollowupMessage from "./editFollowupMessage";
import editOriginalResponse from "./editOriginalResponse";
import fromData from "./fromData";
import resolveID from "./resolveID";
import respond from "./respond";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export type AnyInteraction = Interaction | CommandInteraction | ComponentInteraction;

export type AnyInteractionData = InteractionData | CommandInteractionData | ComponentInteractionData;

/**
 * Interaction Resolvable
 *
 * The types that can be resolved to an interaction
 */
export type InteractionResolvable = Interaction | InteractionData | string;

/**
 * Interaction
 *
 * Represents an interaction that the client receives
 *
 * An `Interaction` is a base class that needs to be extended.
 * For example, a `CommandInteraction` represents a chat input interaction,
 * and a `ComponentInteraction` represents a button or select menu interaction
 */
export default class Interaction extends Base<AnyInteraction> {

    /**
     * ID
     *
     * The interaction's ID
     */
    id: string;

    /**
     * Type
     *
     * The interaction's type
     */
    type: InteractionType;

    /**
     * Token
     *
     * The interaction's token
     */
    token: string;

    /**
     * Application ID
     *
     * The ID of the application that owns this interaction
     */
    applicationID: string;

    /**
     * Data
     *
     * The interaction's data
     */
    data: InteractionMetadata;

    /**
     * Guild ID
     *
     * The ID of the guild this interaction is in
     * `null` if the interaction is sent in a DM channel
     */
    guildID: string | null;

    /**
     * Channel ID
     *
     * The ID of the channel this interaction is in
     */
    channelID: string;

    /**
     * Member
     *
     * The member that created this interaction
     * `null` if the interaction is sent in a DM channel
     */
    member: Member | null;

    /**
     * Permissions
     *
     * The member's permissions including role permissions and channel overwrites
     * `null` if the interaction is sent in a DM channel
     */
    permissions: string | null;

    /**
     * User
     *
     * The user that created this interaction
     */
    user: User;

    /**
     * Interaction
     *
     * @param client The client
     * @param interactionData Options to initialize this interaction with
     * @param interactionData.id The interaction's ID
     * @param interactionData.type The interaction's type
     * @param interactionData.token The interaction's token
     * @param interactionData.applicationID The ID of the application that owns this interaction
     * @param interactionData.data The interaction's data
     * @param interactionData.guildID The ID of the guild this interaction is in
     * @param interactionData.channelID The ID of the channel this interaction is in
     * @param interactionData.member The member that created this interaction
     * @param interactionData.permissions The member's permissions including role permissions and channel overwrites
     * @param interactionData.user The user that created this interaction
     */
    constructor(client: Client, interactionData: InteractionData) {

        // Super
        super(client, {
            id: interactionData.id,
            cacheManager: client._interactions
        });

        // Set data
        Interaction._updateObject(this, interactionData);

        /**
         * Cache Interaction
         *
         * If we need to cache all interactions and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._interactions.cacheAll && client._readyState === READY_STATE_READY) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create an `InteractionData` object from a `RawInteractionData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {AnyInteraction} The interaction
     */
    static _fromRawData(client: Client, rawData: RawInteractionData): AnyInteraction {
        return Interaction.fromData(client, Interaction._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create an `InteractionData` object from a `RawInteractionData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {AnyInteractionData} The interaction data
     */
    static _dataFromRawData(rawData: RawInteractionData): AnyInteractionData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create an `Interaction` from an `InteractionData` object
     *
     * @param client The client
     * @param interactionData The interaction data
     *
     * @returns {Interaction} The interaction
     */
    static fromData(client: Client, interactionData: AnyInteractionData): Interaction {
        return fromData(client, interactionData);
    }

    /**
     * To Data
     *
     * Create an `InteractionData` object from an `Interaction`
     *
     * @param interaction The interaction
     *
     * @returns {AnyInteractionData} The interaction data
     */
    static toData(interaction: AnyInteraction): AnyInteractionData {
        return toData(interaction);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to an interaction ID
     *
     * @param interactionResolvable The interaction resolvable
     *
     * @returns {string | undefined} The resolved interaction ID, or `undefined` if the interaction resolvable is invalid
     */
    static resolveID(interactionResolvable: InteractionResolvable): string | undefined {
        return resolveID(interactionResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Interaction` object with data from an `InteractionData` object
     *
     * @private
     * @param interaction The interaction to update
     * @param interactionData The data to update this interaction with
     */
    static _updateObject(interaction: Interaction, interactionData: InteractionData) {
        updateObject(interaction, interactionData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Interaction` object with data from an `InteractionData` object if it's cached
     *
     * @private
     * @param client The client
     * @param interactionData The interaction data
     *
     * @returns {Interaction | undefined} The interaction
     */
    static _updateObjectFromData(client: Client, interactionData: InteractionData): Interaction | undefined {
        return updateObjectFromData(client, interactionData);
    }

    /**
     * Cache
     *
     * Cache this `Interaction`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._interactions.cache(this.id, this, expiresIn);
    }

    /**
     * Create Followup Message
     *
     * Create a followup message for this interaction
     *
     * @param contentOrData The content or data for the response
     * @param createInteractionMessageData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    createFollowupMessage(contentOrData: string | Embed | CreateInteractionMessageData, createInteractionMessageData?: CreateInteractionMessageData): Promise<Message> {
        return createFollowupMessage(this, contentOrData, createInteractionMessageData);
    }

    /**
     * Delete Followup Message
     *
     * Delete a followup message to this interaction
     *
     * @param message The message to delete
     */
    deleteFollowupMessage(message: MessageResolvable): Promise<void> {
        return this.client.deleteFollowupMessage(this.token, message);
    }

    /**
     * Delete Original Response
     *
     * Delete the original response to this interaction
     */
    deleteOriginalResponse(): Promise<void> {
        return this.client.deleteOriginalInteractionResponse(this.token);
    }

    /**
     * Edit Followup Message
     *
     * Edit a followup message to this interaction
     *
     * @param message The message to edit
     * @param contentOrData The content or data for the response
     * @param editMessageData The data for editing the message
     *
     * @returns {Promise<Message>} The edited message
     */
    editFollowupMessage(message: MessageResolvable, contentOrData: string | Embed | BaseEditMessageData, editMessageData?: BaseEditMessageData): Promise<Message> {
        return editFollowupMessage(this, message, contentOrData, editMessageData);
    }

    /**
     * Edit Original Response
     *
     * Edit the original response to this interaction
     *
     * @param contentOrData The content or data for the response
     * @param editMessageData The data for editing the response
     *
     * @returns {Promise<Message>} The edited response
     */
    editOriginalResponse(contentOrData: string | Embed | BaseEditMessageData, editMessageData?: BaseEditMessageData): Promise<Message> {
        return editOriginalResponse(this, contentOrData, editMessageData);
    }

    /**
     * Get Original Response
     *
     * Get the original response to this interaction
     *
     * @returns {Promise<Message>} The message
     */
    getOriginalResponse(): Promise<Message | undefined> {
        return this.client.getOriginalInteractionResponse(this.token);
    }

    /**
     * Get Followup Message
     *
     * Get a followup message to this interaction
     *
     * @param message The message to get
     *
     * @returns {Promise<Message>} The message
     */
    getFollowupMessage(message: MessageResolvable): Promise<Message | undefined> {
        return this.client.getFollowupMessage(this.token, message);
    }

    /**
     * Respond
     *
     * Respond to this interaction
     *
     * @param contentOrData The content or data for the response
     * @param createInteractionMessageData The data for the response
     *
     * @returns {Promise<Message>} The created response
     */
    respond(contentOrData: string | Embed | CreateInteractionMessageData, createInteractionMessageData?: CreateInteractionMessageData): Promise<Message | undefined> {
        return respond(this, contentOrData, createInteractionMessageData);
    }

    /**
     * Defer Response
     *
     * Defer the response to this interaction
     *
     * @returns {Promise<Message>} The created response
     */
    deferResponse(): Promise<Message | undefined> {
        return this.client.createInteractionResponse(this, this.token, { type: INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE });
    }
}