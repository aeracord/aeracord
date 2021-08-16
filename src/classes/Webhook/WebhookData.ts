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

    /**
     * Fetched At
     *
     * The timestamp for when this webhook was fetched
     */
    fetchedAt: number;
}

/**
 * Webhook Type
 *
 * The types of webhooks
 */
export type WebhookType = typeof WebhookTypes.INCOMING | typeof WebhookTypes.CHANNEL_FOLLOWER;
export const WebhookTypes: {

    /**
     * Incoming
     *
     * A regular webhook
     */
    INCOMING: 1,

    /**
     * Channel Follower
     *
     * A webhook from following an announcement channel
     */
    CHANNEL_FOLLOWER: 2
} = {
    INCOMING: 1,
    CHANNEL_FOLLOWER: 2
};