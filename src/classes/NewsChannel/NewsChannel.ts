import { AnyInteraction, CacheInterface, ChannelResolvable, Client, CreateWebhookData, CHANNEL_TYPE_NEWS, FollowedChannel, Invite, Message, MessageResolvable, NewsChannelData, Webhook } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import applyMixins from "../applyMixins";
import updateObject from "./updateObject";

interface NewsChannel extends TextBasedChannel {

}

class NewsChannel extends GuildChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_NEWS;

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
     * News Channel
     *
     * @param client The client
     * @param newsChannelData Options to initialize this category channel with
     * @param newsChannelData.topic The channel's topic
     * @param newsChannelData.nsfw Whether or not the channel is marked as NSFW
     * @param newsChannelData.rateLimitPerUser The slowmode for this channel in milliseconds
     */
    constructor(client: Client, newsChannelData: NewsChannelData) {

        // Super
        super(client, newsChannelData);

        // Set data
        NewsChannel._updateObject(this, newsChannelData, true);
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
     * Update the `NewsChannel` object with data from a `NewsChannelData` object
     *
     * @private
     * @param newsChannel The news channel to update
     * @param newsChannelData The data to update the news channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(newsChannel: NewsChannel, newsChannelData: NewsChannelData, fromConstructor?: boolean) {
        updateObject(newsChannel, newsChannelData, fromConstructor);
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
     * Crosspost Message
     *
     * Publish a message in this channel
     *
     * @param message The message to crosspost
     *
     * @returns {Promise<Message>} The crossposted message
     */
    crosspostMessage(message: MessageResolvable): Promise<Message> {
        return this.client.crosspostMessage(this, message);
    }

    /**
     * Follow
     *
     * Follow this channel
     *
     * @param targetChannel The target channel
     */
    follow(targetChannel: ChannelResolvable): Promise<FollowedChannel> {
        return this.client.followNewsChannel(this, { targetChannel });
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

    /**
     * Get Webhooks
     *
     * Get the webhooks in this channel
     *
     * @returns {Promise<Webhook[]>} The channel's webhooks
     */
    getWebhooks(): Promise<Webhook[]> {
        return this.client.getChannelWebhooks(this);
    }
}

applyMixins(NewsChannel, [TextBasedChannel]);

export default NewsChannel;