import { Client, RawWebhookData, User } from "../../internal";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";

export interface WebhookData {
    id: string;
    type: WebhookType;
    guildID: string;
    channelID: string;
    name: string;
    avatar?: string;
    creator?: User;
    token?: string;
    applicationID?: string;
}

export type WebhookType = typeof WEBHOOK_TYPE_INCOMING | typeof WEBHOOK_TYPE_CHANNEL_FOLLOWER;
export const WEBHOOK_TYPE_INCOMING = 1;
export const WEBHOOK_TYPE_CHANNEL_FOLLOWER = 2;

export type WebhookResolvable = Webhook | string;

export default class Webhook {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The webhook's ID
     */
    id: string;

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
    avatar?: string;

    /**
     * User
     *
     * The user that created this webhook
     */
    creator?: User;

    /**
     * Token
     *
     * The webhook's token
     */
    token?: string;

    /**
     * Application ID
     *
     * The webhook's application ID
     */
    applicationID?: string;

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

        // Set data
        this.client = client;
        this.id = webhookData.id;
        this.type = webhookData.type;
        this.guildID = webhookData.guildID;
        this.channelID = webhookData.channelID;
        this.name = webhookData.name;
        this.avatar = webhookData.avatar;
        this.creator = webhookData.creator;
        this.token = webhookData.token;
        this.applicationID = webhookData.applicationID;
    }

    /**
     * From Raw Data
     *
     * Create a `Webhook` from a `RawWebhookData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Webhook} The webhook
     */
    static _fromRawData = (client: Client, rawData: RawWebhookData): Webhook => fromRawData(client, rawData);

    /**
     * Resolve ID
     *
     * Resolve an object to a webhook ID
     *
     * @param webhookResolvable The webhook resolvable
     *
     * @returns {string} The resolved webhook ID
     */
    static resolveID = (webhookResolvable: WebhookResolvable): string => resolveID(webhookResolvable);
}