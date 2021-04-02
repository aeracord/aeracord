import { UserData } from "../../internal";

/**
 * Webhook Data
 *
 * Represents a `Webhook`
 */
export interface WebhookData {

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
}

/**
 * Webhook Type
 *
 * The types of webhooks
 */
export type WebhookType = typeof WEBHOOK_TYPE_INCOMING | typeof WEBHOOK_TYPE_CHANNEL_FOLLOWER;

/**
 * Webhook Type: Incoming
 *
 * A regular webhook
 */
export const WEBHOOK_TYPE_INCOMING = 1;

/**
 * Webhook Type: Channel Follower
 *
 * A webhook from following an announcement channel
 */
export const WEBHOOK_TYPE_CHANNEL_FOLLOWER = 2;