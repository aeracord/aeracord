import { WebhookData } from "../../../../internal";

export interface WebhooksUpdateData {

    /**
     * Guild ID
     *
     * The ID of the guild the webhooks were updated in
     */
    guildID: string;

    /**
     * Channel ID
     *
     * The ID of the channel the webhooks were updated in
     */
    channelID: string;

    /**
     * Webhooks
     *
     * The webhooks
     */
    webhooks: WebhookData[];
}