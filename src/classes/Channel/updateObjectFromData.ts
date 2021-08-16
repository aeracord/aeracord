import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, ChannelTypes, Client, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, ThreadChannel, ThreadChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function updateObjectFromData(client: Client, channelData: AnyChannelData): AnyChannel | undefined {

    // Get channel from cache
    let channel: AnyChannel | undefined = client.channels.get(channelData.id);

    // Update channel object
    if (channel) {

        // Text channel
        if (channel.type === ChannelTypes.TEXT) TextChannel._updateObject(channel as TextChannel, channelData as TextChannelData);

        // DM channel
        else if (channel.type === ChannelTypes.DM) DMChannel._updateObject(channel as DMChannel, channelData as DMChannelData);

        // Voice channel
        else if (channel.type === ChannelTypes.VOICE) VoiceChannel._updateObject(channel as VoiceChannel, channelData as VoiceChannelData);

        // Category channel
        else if (channel.type === ChannelTypes.CATEGORY) CategoryChannel._updateObject(channel as CategoryChannel, channelData as CategoryChannelData);

        // News channel
        else if (channel.type === ChannelTypes.NEWS) NewsChannel._updateObject(channel as NewsChannel, channelData as NewsChannelData);

        // Store channel
        else if (channel.type === ChannelTypes.STORE) StoreChannel._updateObject(channel as StoreChannel, channelData as StoreChannelData);

        // Stage channel
        else if (channel.type === ChannelTypes.STAGE) StageChannel._updateObject(channel as StageChannel, channelData as StageChannelData);

        // Thread channel
        else if ((channel.type === ChannelTypes.NEWS_THREAD) || (channel.type === ChannelTypes.PUBLIC_THREAD) || (channel.type === ChannelTypes.PRIVATE_THREAD)) ThreadChannel._updateObject(channel as ThreadChannel, channelData as ThreadChannelData);

        // Unknown channel type
        else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return channel;
}