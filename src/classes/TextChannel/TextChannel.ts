import { Client, GuildChannelData, TextBasedChannelData } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import applyMixins from "../applyMixins";

export interface TextChannelData extends GuildChannelData, TextBasedChannelData {
    topic?: string;
    nsfw?: boolean;
    rateLimitPerUser?: number;
}

interface TextChannel extends GuildChannel, TextBasedChannel {

}

class TextChannel {

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
     * Text Channel
     *
     * @param client The client
     * @param textChannelData Options to initialize this text channel with
     * @param textChannelData.topic The channel's topic
     * @param textChannelData.nsfw Whether or not the channel is marked as NSFW
     * @param textChannelData.rateLimitPerUser The slowmode for this channel in milliseconds
     */
    constructor(client: Client, textChannelData: TextChannelData) {

        // Set data
        this.client = client;
        this.id = textChannelData.id;
        this.name = textChannelData.name;
        this.guildID = textChannelData.guildID;
        this.position = textChannelData.position;
        this.permissionOverwrites = textChannelData.permissionOverwrites;
        this.parentID = textChannelData.parentID;
        this.topic = textChannelData.topic;
        this.nsfw = Boolean(textChannelData.nsfw);
        this.rateLimitPerUser = textChannelData.rateLimitPerUser;
        this.lastMessageID = textChannelData.lastMessageID;
        this.lastPinTimestamp = textChannelData.lastPinTimestamp;
    }
}

applyMixins(TextChannel, [GuildChannel, TextBasedChannel]);

export default TextChannel;