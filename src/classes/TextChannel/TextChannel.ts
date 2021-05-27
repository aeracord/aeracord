import { AnyInteraction, CacheInterface, Client, CreateWebhookData, CHANNEL_TYPE_TEXT, Invite, Message, TextChannelData, Webhook } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import applyMixins from "../applyMixins";
import updateObject from "./updateObject";

interface TextChannel extends TextBasedChannel {

}

class TextChannel extends GuildChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_TEXT;

    /**
     * Topic
     *
     * The channel's topic
     */
    topic: string | null;

    /**
     * NSFW
     *
     * Whether or not the channel is marked as NSFW
     */
    nsfw: boolean;

    /**
     * Rate Limit Per User
     *
     * The slowmode for this channel in milliseconds
     */
    rateLimitPerUser: number | null;

    /**
     * Invites
     *
     * The cache manager interface for the invites in this channel
     */
    invites: CacheInterface<Invite>;

    /**
     * Webhooks
     *
     * The cache manager interface for the webhooks in this channel
     */
    webhooks: CacheInterface<Webhook>;

    /**
     * Text Channel
     *
     * @param client The client
     * @param textChannelData Options to initialize this text channel with
     * @param textChannelData.topic The channel's topic
     * @param textChannelData.nsfw Whether or not the channel is marked as NSFW
     * @param textChannelData.rateLimitPerUser The slowmode for this channel in milliseconds
     */
    constructor(client: Client, textChannelData: TextChannelData) {

        // Super
        super(client, textChannelData);

        // Set data
        TextChannel._updateObject(this, textChannelData, true);
        Object.defineProperty(this, "interactions", {
            value: new CacheInterface<AnyInteraction, false>(this.client, {
                cacheManager: this.client._interactions,
                match: (i: AnyInteraction) => i.channelID === this.id
            })
        });
        Object.defineProperty(this, "invites", {
            value: new CacheInterface<Invite>(this.client, {
                cacheManager: this.client._invites,
                match: (i: Invite) => i.channelID === this.id,
                fetchObject: async (id: string): Promise<Invite | undefined> => await this.client.getInvite(id)
            })
        });
        Object.defineProperty(this, "messages", {
            value: new CacheInterface<Message>(this.client, {
                cacheManager: this.client._messages,
                match: (m: Message) => m.channelID === this.id,
                fetchObject: async (id: string): Promise<Message | undefined> => await this.client.getChannelMessage(this.id, id)
            })
        });
        Object.defineProperty(this, "webhooks", {
            value: new CacheInterface<Webhook>(this.client, {
                cacheManager: this.client._webhooks,
                match: (w: Webhook) => w.channelID === this.id,
                fetchObject: async (id: string): Promise<Webhook | undefined> => await this.client.getWebhook(this, id)
            })
        });
    }

    /**
     * Update Object
     *
     * Update the `TextChannel` object with data from a `TextChannelData` object
     *
     * @private
     * @param textChannel The text channel to update
     * @param textChannelData The data to update the text channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(textChannel: TextChannel, textChannelData: TextChannelData, fromConstructor?: boolean) {
        updateObject(textChannel, textChannelData, fromConstructor);
    }

    /**
     * Create Webhook
     *
     * Create a webhook in this channel
     *
     * @param createWebhookData The data for the webhook
     * @param reason The reason for creating the webhook
     *
     * @returns {Promise<Webhook>} The created webhook
     */
    createWebhook(createWebhookData: CreateWebhookData, reason?: string): Promise<Webhook> {
        return this.client.createWebhook(this, createWebhookData, reason);
    }

    /**
     * Get Invites
     *
     * Get this channel's invites
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getInvites(): Promise<Invite[]> {
        return this.client.getChannelInvites(this);
    }
}

applyMixins(TextChannel, [TextBasedChannel]);

export default TextChannel;