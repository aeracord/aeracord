import { CacheManagerInterface, ChannelResolvable, Client, CreateWebhookData, FollowedChannel, Invite, MessageData, MessageResolvable, TextChannelData, WebhookData } from "../../internal";
import TextChannel from "../TextChannel/TextChannel";
import updateObject from "./updateObject";

export interface NewsChannelData extends TextChannelData { }

export default class NewsChannel extends TextChannel {

    /**
     * Invites
     *
     * The cache manager interface for the invites in this channel
     */
    invites: CacheManagerInterface<Invite>;

    /**
     * News Channel
     *
     * @param client The client
     * @param newsChannelData Options to initialize this category channel with
     */
    constructor(client: Client, newsChannelData: NewsChannelData) {

        // Super
        super(client, newsChannelData);

        // Set data
        NewsChannel._updateObject(this, newsChannelData, true);
        this.invites = new CacheManagerInterface<Invite>(this.client, {
            cacheManager: this.client._invites,
            match: (i: Invite) => i.channelID === this.id,
            fetchObject: async (id: string): Promise<Invite> => Invite.fromData(this.client, await this.client.getInvite(id))
        });
    }

    /**
     * Update Object
     *
     * Update the `NewsChannel` object with data from a `NewsChannelData` object
     *
     * @param newsChannel The news channel to update
     * @param newsChannelData The data to update the news channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(newsChannel: NewsChannel, newsChannelData: NewsChannelData, fromConstructor?: boolean) {
        updateObject(newsChannel, newsChannelData, fromConstructor);
    }
}