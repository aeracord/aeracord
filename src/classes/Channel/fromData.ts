import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function fromData(client: Client, channelData: AnyChannelData): AnyChannel {

    // Get channel from cache
    let channel: AnyChannel | undefined = client.channels.get(channelData.id);

    // Text channel
    if (channelData.type === CHANNEL_TYPE_TEXT) {

        // Update channel object
        if (channel) TextChannel._updateObject(channel as TextChannel, channelData as TextChannelData);

        // Create channel
        else channel = new TextChannel(client, channelData as TextChannelData);
    }

    // DM channel
    else if (channelData.type === CHANNEL_TYPE_DM) {

        // Update channel object
        if (channel) DMChannel._updateObject(channel as DMChannel, channelData as DMChannelData);

        // Create channel
        else channel = new DMChannel(client, channelData as DMChannelData);
    }

    // Voice channel
    else if (channelData.type === CHANNEL_TYPE_VOICE) {

        // Update channel object
        if (channel) VoiceChannel._updateObject(channel as VoiceChannel, channelData as VoiceChannelData);

        // Create channel
        else channel = new VoiceChannel(client, channelData as VoiceChannelData);
    }

    // Category channel
    else if (channelData.type === CHANNEL_TYPE_CATEGORY) {

        // Update channel object
        if (channel) CategoryChannel._updateObject(channel as CategoryChannel, channelData as CategoryChannelData);

        // Create channel
        else channel = new CategoryChannel(client, channelData as CategoryChannelData);
    }

    // News channel
    else if (channelData.type === CHANNEL_TYPE_NEWS) {

        // Update channel object
        if (channel) NewsChannel._updateObject(channel as NewsChannel, channelData as NewsChannelData);

        // Create channel
        else channel = new NewsChannel(client, channelData as NewsChannelData);
    }

    // Store channel
    else if (channelData.type === CHANNEL_TYPE_STORE) {

        // Update channel object
        if (channel) StoreChannel._updateObject(channel as StoreChannel, channelData as StoreChannelData);

        // Create channel
        else channel = new StoreChannel(client, channelData as StoreChannelData);
    }

    // Unknown channel type
    else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/APixelVisuals/aeracord`);

    // Return
    return channel;
}