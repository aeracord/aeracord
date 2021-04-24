import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData, Channel } from "../../internal";

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

        // Unknown channel type
        else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return channel;
}