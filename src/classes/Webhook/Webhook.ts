import { Base, Client, ModifyWebhookData, RawWebhookData, UserData, WebhookData, WebhookType } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Webhook Resolvable
 *
 * The types that can be resolved to a webhook
 */
export type WebhookResolvable = Webhook | WebhookData | string;

export default class Webhook extends Base<Webhook> {

    /**
     * Type
     *
     * The webhook's type
     */
    type: WebhookType;

    /**
     * Guild ID
     *
     * The ID of the guild this webhook is in
     */
    guildID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this webhook is in
     */
    channelID: string;

    /**
     * Name
     *
     * The webhook's name
     */
    name: string;

    /**
     * Avatar
     *
     * The webhook's avatar
     */
    avatar: string | null;

    /**
     * User
     *
     * The user that created this webhook
     */
    creator: UserData;

    /**
     * Token
     *
     * The webhook's token
     */
    token: string | null;

    /**
     * Application ID
     *
     * The webhook's application ID
     */
    applicationID: string | null;

    /**
     * Webhook
     *
     * @param client The client
     * @param webhookData Options to initialize this webhook with
     * @param webhookData.id The webhook's ID
     * @param webhookData.type The webhook's type
     * @param webhookData.guildID The ID of the guild this webhook is in
     * @param webhookData.channelID The ID of the channel this webhook is in
     * @param webhookData.name The webhook's name
     * @param webhookData.avatar The webhook's avatar
     * @param webhookData.creator The user that created this webhook
     * @param webhookData.token The webhook's token
     * @param webhookData.applicationID The webhook's application ID
     */
    constructor(client: Client, webhookData: WebhookData) {

        // Super
        super(client, {
            id: webhookData.id,
            cacheManager: client._webhooks
        });

        // Set data
        Webhook._updateObject(this, webhookData);

        // Cache webhook
        this.client._webhooks.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `WebhookData` object from a `RawWebhookData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {WebhookData} The webhook data
     */
    static _fromRawData(client: Client, rawData: RawWebhookData): WebhookData {
        return fromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create a `Webhook` from a `WebhookData` object
     *
     * @param client The client
     * @param webhookData The webhook data
     *
     * @returns {Webhook} The webhook
     */
    static fromData(client: Client, webhookData: WebhookData): Webhook {
        return fromData(client, webhookData);
    }

    /**
     * To Data
     *
     * Create a `WebhookData` object from a `Webhook`
     *
     * @param webhook The webhook
     *
     * @returns {WebhookData} The webhook data
     */
    static toData(webhook: Webhook): WebhookData {
        return toData(webhook);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a webhook ID
     *
     * @param webhookResolvable The webhook resolvable
     *
     * @returns {string | undefined} The resolved webhook ID, or `undefined` if the webhook resolvable is invalid
     */
    static resolveID(webhookResolvable: WebhookResolvable): string | undefined {
        return resolveID(webhookResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Webhook` object with data from a `WebhookData` object
     *
     * @param webhook The webhook to update
     * @param webhookData The data to update this webhook with
     */
    static _updateObject(webhook: Webhook, webhookData: WebhookData) {
        updateObject(webhook, webhookData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Webhook` object with data from a `WebhookData` object if it's cached
     *
     * @param client The client
     * @param webhookData The webhook data
     *
     * @returns {Webhook | undefined} The webhook
     */
    static _updateObjectFromData(client: Client, webhookData: WebhookData): Webhook | undefined {
        return updateObjectFromData(client, webhookData);
    }

    /**
     * Delete
     *
     * Delete this webhook
     *
     * @param reason The reason for deleting this webhook
     */
    delete(reason?: string): Promise<void> {
        return this.client.deleteWebhook(this.channelID, this, reason);
    }

    /**
     * Edit
     *
     * Edit this webhook
     *
     * @param modifyWebhookData The data to modify the webhook
     * @param reason The reason for modifying this webhook
     *
     * @returns {Promise<WebhookData>} The modified webhook's data
     */
    edit(modifyWebhookData: ModifyWebhookData, reason?: string): Promise<WebhookData> {
        return this.client.modifyWebhook(this.channelID, this, modifyWebhookData, reason);
    }
}