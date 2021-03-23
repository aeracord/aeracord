import { AnyChannelData, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, PermissionOverwrite, RawChannelData, RawUserData } from "../../internal";

export default function fromRawData(rawData: RawChannelData): AnyChannelData {

    // Get channel from cache
    let channelData: AnyChannelData;

    // Text channel
    if (rawData.type === CHANNEL_TYPE_TEXT) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id,
        topic: rawData.topic,
        nsfw: rawData.nsfw,
        rateLimitPerUser: rawData.rate_limit_per_user,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null
    };

    // DM channel
    else if (rawData.type === CHANNEL_TYPE_DM) channelData = {
        id: rawData.id,
        type: rawData.type,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        recipient: (rawData.recipients as RawUserData[])[0].id
    };

    // Voice channel
    else if (rawData.type === CHANNEL_TYPE_VOICE) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id,
        bitrate: rawData.bitrate,
        userLimit: rawData.user_limit
    };

    // Category channel
    else if (rawData.type === CHANNEL_TYPE_CATEGORY) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id
    };

    // News channel
    else if (rawData.type === CHANNEL_TYPE_NEWS) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id,
        topic: rawData.topic,
        nsfw: rawData.nsfw,
        rateLimitPerUser: rawData.rate_limit_per_user,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null
    };

    // Store channel
    else if (rawData.type === CHANNEL_TYPE_STORE) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id
    };

    // Unknown channel type
    else throw new Error(`Unknown channel type '${rawData.type}'. Please open an issue about this at https://github.com/APixelVisuals/aeracord`);

    // Return
    return channelData;
}