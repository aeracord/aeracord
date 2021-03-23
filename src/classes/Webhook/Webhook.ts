import { Base, Client, RawWebhookData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";

export interface WebhookData {
    id: string;
    type: WebhookType;
    guildID: string;
    channelID: string;
    name: string;
    avatar: string | null;
    creator: UserData;
    token: string | null;
    applicationID: string | null;
}

export type WebhookType = typeof WEBHOOK_TYPE_INCOMING | typeof WEBHOOK_TYPE_CHANNEL_FOLLOWER;
export const WEBHOOK_TYPE_INCOMING = 1;
export const WEBHOOK_TYPE_CHANNEL_FOLLOWER = 2;

export type WebhookResolvable = Webhook | string;

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
    static _fromRawData(rawData: RawWebhookData): WebhookData {
        return fromRawData(rawData);
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
}