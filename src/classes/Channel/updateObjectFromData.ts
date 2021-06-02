import { AnyChannel, AnyChannelData, CategoryChannel, CategoryChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STAGE, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, DMChannel, DMChannelData, NewsChannel, NewsChannelData, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function updateObjectFromData(client: Client, channelData: AnyChannelData): AnyChannel | undefined {

    // Get channel from cache
    let channel: AnyChannel | undefined = client.channels.get(channelData.id);

    // Update channel object
    if (channel) {

        // Text channel
        if (channel.type === CHANNEL_TYPE_TEXT) TextChannel._updateObject(channel as TextChannel, channelData as TextChannelData);

        // DM channel
        else if (channel.type === CHANNEL_TYPE_DM) DMChannel._updateObject(channel as DMChannel, channelData as DMChannelData);

        // Voice channel
        else if (channel.type === CHANNEL_TYPE_VOICE) VoiceChannel._updateObject(channel as VoiceChannel, channelData as VoiceChannelData);

        // Category channel
        else if (channel.type === CHANNEL_TYPE_CATEGORY) CategoryChannel._updateObject(channel as CategoryChannel, channelData as CategoryChannelData);

        // News channel
        else if (channel.type === CHANNEL_TYPE_NEWS) NewsChannel._updateObject(channel as NewsChannel, channelData as NewsChannelData);

        // Store channel
        else if (channel.type === CHANNEL_TYPE_STORE) StoreChannel._updateObject(channel as StoreChannel, channelData as StoreChannelData);

        // Stage channel
        else if (channel.type === CHANNEL_TYPE_STAGE) StageChannel._updateObject(channel as StageChannel, channelData as StageChannelData);

        // Unknown channel type
        else throw new Error(`Unknown channel type '${channelData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
    }

    // Return
    return channel;
}