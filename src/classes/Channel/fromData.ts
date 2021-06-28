import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, Channel, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_NEWS_THREAD, CHANNEL_TYPE_PRIVATE_THREAD, CHANNEL_TYPE_PUBLIC_THREAD, CHANNEL_TYPE_STAGE, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, ThreadChannel, ThreadChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function fromData(client: Client, channelData: AnyChannelData): AnyChannel {

    // Update cached channel
    let channel: AnyChannel | undefined = Channel._updateObjectFromData(client, channelData);

    // Create channel
    if (!channel) {

        // Text channel
        if (channelData.type === CHANNEL_TYPE_TEXT) channel = new TextChannel(client, channelData as TextChannelData);

        // DM channel
        else if (channelData.type === CHANNEL_TYPE_DM) channel = new DMChannel(client, channelData as DMChannelData);

        // Voice channel
        else if (channelData.type === CHANNEL_TYPE_VOICE) channel = new VoiceChannel(client, channelData as VoiceChannelData);

        // Category channel
        else if (channelData.type === CHANNEL_TYPE_CATEGORY) channel = new CategoryChannel(client, channelData as CategoryChannelData);

        // News channel
        else if (channelData.type === CHANNEL_TYPE_NEWS) channel = new NewsChannel(client, channelData as NewsChannelData);

        // Store channel
        else if (channelData.type === CHANNEL_TYPE_STORE) channel = new StoreChannel(client, channelData as StoreChannelData);

        // Stage channel
        else if (channelData.type === CHANNEL_TYPE_STAGE) channel = new StageChannel(client, channelData as StageChannelData);

        // Thread channel
        else if ((channelData.type === CHANNEL_TYPE_NEWS_THREAD) || (channelData.type === CHANNEL_TYPE_PUBLIC_THREAD) || (channelData.type === CHANNEL_TYPE_PRIVATE_THREAD)) channel = new ThreadChannel(client, channelData as ThreadChannelData);

        // Unknown channel type
        else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return channel;
}