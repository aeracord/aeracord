import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, Channel, ChannelTypes, Client, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, ThreadChannel, ThreadChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function fromData(client: Client, channelData: AnyChannelData): AnyChannel {

    // Update cached channel
    let channel: AnyChannel | undefined = Channel._updateObjectFromData(client, channelData);

    // Create channel
    if (!channel) {

        // Text channel
        if (channelData.type === ChannelTypes.TEXT) channel = new TextChannel(client, channelData as TextChannelData);

        // DM channel
        else if (channelData.type === ChannelTypes.DM) channel = new DMChannel(client, channelData as DMChannelData);

        // Voice channel
        else if (channelData.type === ChannelTypes.VOICE) channel = new VoiceChannel(client, channelData as VoiceChannelData);

        // Category channel
        else if (channelData.type === ChannelTypes.CATEGORY) channel = new CategoryChannel(client, channelData as CategoryChannelData);

        // News channel
        else if (channelData.type === ChannelTypes.NEWS) channel = new NewsChannel(client, channelData as NewsChannelData);

        // Store channel
        else if (channelData.type === ChannelTypes.STORE) channel = new StoreChannel(client, channelData as StoreChannelData);

        // Stage channel
        else if (channelData.type === ChannelTypes.STAGE) channel = new StageChannel(client, channelData as StageChannelData);

        // Thread channel
        else if ((channelData.type === ChannelTypes.NEWS_THREAD) || (channelData.type === ChannelTypes.PUBLIC_THREAD) || (channelData.type === ChannelTypes.PRIVATE_THREAD)) channel = new ThreadChannel(client, channelData as ThreadChannelData);

        // Unknown channel type
        else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return channel;
}