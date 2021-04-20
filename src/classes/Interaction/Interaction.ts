import { Base, Client, CreateInteractionResponseData, EditInteractionResponseData, Embed, FollowupInteractionResponseData, InteractionCommandData, InteractionData, InteractionType, MemberData, Message, MessageResolvable, RawInteractionData, READY_STATE_READY, UserData } from "../../internal";
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

/**
 * Interaction Resolvable
 *
 * The types that can be resolved to an interaction
 */
export type InteractionResolvable = Interaction | InteractionData | string;

export default class Interaction extends Base<Interaction> {

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
    data: InteractionCommandData;

    /**
     * Guild ID
     *
     * The ID of the guild this interaction is in
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
     */
    member: MemberData | null;

    /**
     * Permissions
     *
     * The member's permissions including role permissions and channel overwrites
     */
    permissions: string | null;

    /**
     * User
     *
     * The user that created this interaction
     */
    user: UserData;

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

        /**
         * Define Cache
         *
         * If we need to cache all bans and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        const cache: boolean = client._interactions.cacheAll && client._readyState === READY_STATE_READY;

        // Super
        super(client, {
            id: interactionData.id,
            cacheManager: client._interactions,
            expiresFromCacheIn: cache ? (client._interactions.cacheFor || null) : undefined
        });

        // Set data
        Interaction._updateObject(this, interactionData);

        // Cache interaction
        if (cache) this.client._interactions.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create an `InteractionData` object from a `RawInteractionData` object
     *
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Interaction} The interaction
     */
    static _fromRawData(client: Client, rawData: RawInteractionData): Interaction {
        return Interaction.fromData(client, Interaction._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create an `InteractionData` object from a `RawInteractionData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {InteractionData} The interaction data
     */
    static _dataFromRawData(rawData: RawInteractionData): InteractionData {
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
    static fromData(client: Client, interactionData: InteractionData): Interaction {
        return fromData(client, interactionData);
    }

    /**
     * To Data
     *
     * Create an `InteractionData` object from an `Interaction`
     *
     * @param interaction The interaction
     *
     * @returns {InteractionData} The interaction data
     */
    static toData(interaction: Interaction): InteractionData {
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
     */
    cache() {
        this.client._interactions.cache(this.id, this);
    }

    /**
     * Create Followup Message
     *
     * Create a followup message for this interaction
     *
     * @param contentOrData The content or data for the response
     * @param followupInteractionResponseData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    createFollowupMessage(contentOrData: string | Embed | FollowupInteractionResponseData, followupInteractionResponseData?: FollowupInteractionResponseData): Promise<Message> {
        return createFollowupMessage(this, contentOrData, followupInteractionResponseData);
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
     * @param editInteractionResponseData The data for editing the message
     *
     * @returns {Promise<Message>} The edited message
     */
    editFollowupMessage(message: MessageResolvable, contentOrData: string | Embed | EditInteractionResponseData, editInteractionResponseData?: EditInteractionResponseData): Promise<Message> {
        return editFollowupMessage(this, message, contentOrData, editInteractionResponseData);
    }

    /**
     * Edit Original Response
     *
     * Edit the original response to this interaction
     *
     * @param contentOrData The content or data for the response
     * @param editInteractionResponseData The data for editing the response
     *
     * @returns {Promise<Message>} The edited response
     */
    editOriginalResponse(contentOrData: string | Embed | EditInteractionResponseData, editInteractionResponseData?: EditInteractionResponseData): Promise<Message> {
        return editOriginalResponse(this, contentOrData, editInteractionResponseData);
    }

    /**
     * Respond
     *
     * Respond to this interaction
     *
     * @param contentOrData The content or data for the response
     * @param createInteractionResponseData The data for the response
     *
     * @returns {Promise<Message>} The created response
     */
    respond(contentOrData: string | Embed | CreateInteractionResponseData, createInteractionResponseData?: CreateInteractionResponseData): Promise<Message> {
        return respond(this, contentOrData, createInteractionResponseData);
    }
}