import { CacheManagerInterface, Client, GuildChannelData, Invite, Message, TextBasedChannelData, Webhook } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import applyMixins from "../applyMixins";
import updateObject from "./updateObject";

export interface TextChannelData extends GuildChannelData, TextBasedChannelData {
    topic?: string;
    nsfw?: boolean;
    rateLimitPerUser?: number;
}

interface TextChannel extends TextBasedChannel {

}

class TextChannel extends GuildChannel {

    /**
     * Topic
     *
     * The channel's topic
     */
    topic?: string;

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
    rateLimitPerUser?: number;

    /**
     * Invites
     *
     * The cache manager interface for the invites in this channel
     */
    invites: CacheManagerInterface<Invite>;

    /**
     * Webhooks
     *
     * The cache manager interface for the webhooks in this channel
     */
    webhooks: CacheManagerInterface<Webhook>;

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
        this.messages = new CacheManagerInterface<Message>(this.client, {
            cacheManager: this.client._messages,
            match: (m: Message) => m.channelID === this.id,
            fetchObject: async (id: string): Promise<Message> => Message.fromData(this.client, await this.client.getChannelMessage(this.id, id))
        });
        this.invites = new CacheManagerInterface<Invite>(this.client, {
            cacheManager: this.client._invites,
            match: (i: Invite) => i.channelID === this.id,
            fetchObject: async (id: string): Promise<Invite> => Invite.fromData(this.client, await this.client.getInvite(id))
        });
        this.webhooks = new CacheManagerInterface<Webhook>(this.client, {
            cacheManager: this.client._webhooks,
            match: (w: Webhook) => w.channelID === this.id,
            fetchObject: async (id: string): Promise<Webhook> => Webhook.fromData(this.client, await this.client.getWebhook(id))
        });
    }

    /**
     * Update Object
     *
     * Update the `TextChannel` object with data from a `TextChannelData` object
     *
     * @param textChannel The text channel to update
     * @param textChannelData The data to update the text channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(textChannel: TextChannel, textChannelData: TextChannelData, fromConstructor?: boolean) {
        updateObject(textChannel, textChannelData, fromConstructor);
    }
}

applyMixins(TextChannel, [TextBasedChannel]);

export default TextChannel;