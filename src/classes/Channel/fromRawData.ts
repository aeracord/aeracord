import { AnyChannel, CategoryChannel, CategoryChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, DMChannel, DMChannelData, NewsChannel, NewsChannelData, PermissionOverwrite, RawChannelData, RawUserData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawChannelData): AnyChannel {

    // Get channel from cache
    let channel: AnyChannel | undefined = client.channels.get(rawData.id);

    // Text channel
    if (rawData.type === CHANNEL_TYPE_TEXT) {

        // Parse channel data
        const channelData: TextChannelData = {
            id: rawData.id,
            name: rawData.name as string,
            guildID: rawData.guild_id as string,
            position: rawData.position as number,
            permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
            parentID: rawData.parent_id || undefined,
            topic: rawData.topic || undefined,
            nsfw: rawData.nsfw,
            rateLimitPerUser: rawData.rate_limit_per_user,
            lastMessageID: rawData.last_message_id || undefined,
            lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : undefined
        };

        // Update channel object
        if (channel) TextChannel._updateObject(channel as TextChannel, channelData);

        // Create channel
        else channel = new TextChannel(client, channelData);
    }

    // DM channel
    else if (rawData.type === CHANNEL_TYPE_DM) {

        // Parse channel data
        const channelData: DMChannelData = {
            id: rawData.id,
            lastMessageID: rawData.last_message_id || undefined,
            lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : undefined,
            recipient: (rawData.recipients as RawUserData[])[0].id
        };

        // Update channel object
        if (channel) DMChannel._updateObject(channel as DMChannel, channelData);

        // Create channel
        else channel = new DMChannel(client, channelData);
    }

    // Voice channel
    else if (rawData.type === CHANNEL_TYPE_VOICE) {

        // Parse channel data
        const channelData: VoiceChannelData = {
            id: rawData.id,
            name: rawData.name as string,
            guildID: rawData.guild_id as string,
            position: rawData.position as number,
            permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
            parentID: rawData.parent_id || undefined,
            bitrate: rawData.bitrate,
            userLimit: rawData.user_limit
        };

        // Update channel object
        if (channel) VoiceChannel._updateObject(channel as VoiceChannel, channelData);

        // Create channel
        else channel = new VoiceChannel(client, channelData);
    }

    // Category channel
    else if (rawData.type === CHANNEL_TYPE_CATEGORY) {

        // Parse channel data
        const channelData: CategoryChannelData = {
            id: rawData.id,
            name: rawData.name as string,
            guildID: rawData.guild_id as string,
            position: rawData.position as number,
            permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
            parentID: rawData.parent_id || undefined
        };

        // Update channel object
        if (channel) CategoryChannel._updateObject(channel as CategoryChannel, channelData);

        // Create channel
        else channel = new CategoryChannel(client, channelData);
    }

    // News channel
    else if (rawData.type === CHANNEL_TYPE_NEWS) {

        // Parse channel data
        const channelData: NewsChannelData = {
            id: rawData.id,
            name: rawData.name as string,
            guildID: rawData.guild_id as string,
            position: rawData.position as number,
            permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
            parentID: rawData.parent_id || undefined,
            topic: rawData.topic || undefined,
            nsfw: rawData.nsfw,
            rateLimitPerUser: rawData.rate_limit_per_user,
            lastMessageID: rawData.last_message_id || undefined,
            lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : undefined
        };

        // Update channel object
        if (channel) NewsChannel._updateObject(channel as NewsChannel, channelData);

        // Create channel
        else channel = new NewsChannel(client, channelData);
    }

    // Store channel
    else if (rawData.type === CHANNEL_TYPE_STORE) {

        // Parse channel data
        const channelData: StoreChannelData = {
            id: rawData.id,
            name: rawData.name as string,
            guildID: rawData.guild_id as string,
            position: rawData.position as number,
            permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
            parentID: rawData.parent_id || undefined
        };

        // Update channel object
        if (channel) StoreChannel._updateObject(channel as StoreChannel, channelData);

        // Create channel
        else channel = new StoreChannel(client, channelData);
    }

    // Unknown channel type
    else throw new Error(`Unknown channel type '${rawData.type}'. Please open an issue about this at https://github.com/APixelVisuals/aeracord`);

    // Return
    return channel;
}