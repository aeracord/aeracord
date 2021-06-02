import { AnyChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STAGE, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, Permissions, RawChannelData, RawChannelDataPermissionOverwrite, RawUserData, VIDEO_QUALITY_MODE_AUTO } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawChannelData): AnyChannelData {

    // Define channel data
    let channelData: AnyChannelData;

    // Parse text channel data
    if (rawData.type === CHANNEL_TYPE_TEXT) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        topic: rawData.topic,
        nsfw: rawData.nsfw,
        rateLimitPerUser: rawData.rate_limit_per_user,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        fetchedAt: Date.now()
    };

    // Parse DM channel data
    else if (rawData.type === CHANNEL_TYPE_DM) channelData = {
        id: rawData.id,
        type: rawData.type,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        recipient: (rawData.recipients as RawUserData[])[0].id,
        fetchedAt: Date.now()
    };

    // Parse voice channel data
    else if (rawData.type === CHANNEL_TYPE_VOICE) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        bitrate: rawData.bitrate,
        userLimit: rawData.user_limit,
        videoQualityMode: rawData.video_quality_mode || VIDEO_QUALITY_MODE_AUTO,
        fetchedAt: Date.now()
    };

    // Parse category channel data
    else if (rawData.type === CHANNEL_TYPE_CATEGORY) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        fetchedAt: Date.now()
    };

    // Parse news channel data
    else if (rawData.type === CHANNEL_TYPE_NEWS) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        topic: rawData.topic,
        nsfw: rawData.nsfw,
        rateLimitPerUser: rawData.rate_limit_per_user,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        fetchedAt: Date.now()
    };

    // Parse store channel data
    else if (rawData.type === CHANNEL_TYPE_STORE) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        fetchedAt: Date.now()
    };

    // Parse stage channel data
    else if (rawData.type === CHANNEL_TYPE_STAGE) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: (rawData.permission_overwrites as RawChannelDataPermissionOverwrite[]).map((p: RawChannelDataPermissionOverwrite) => ({
            id: p.id,
            type: p.type,
            allow: new Permissions(p.allow),
            deny: new Permissions(p.deny)
        })),
        parentID: rawData.parent_id,
        fetchedAt: Date.now()
    };

    // Unknown channel type
    else throw new Error(`Unknown channel type '${rawData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Set channel permissions
    if ((client._channelPermissions) && ("guildID" in channelData)) client._channelPermissions.set(channelData.id, {
        guildID: channelData.guildID,
        permissionOverwrites: channelData.permissionOverwrites
    });

    // Return
    return channelData;
}