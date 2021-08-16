import { AnyChannelData, CategoryChannelData, ChannelTypes, Client, DMChannelData, NewsChannelData, Permissions, RawChannelData, RawChannelDataPermissionOverwrite, RawChannelDataThreadMetadata, RawUserData, StageChannelData, StoreChannelData, TextChannelData, ThreadChannel, ThreadChannelData, VideoQualityModes, VoiceChannelData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawChannelData): AnyChannelData {

    // Define channel data
    let channelData: AnyChannelData;

    // Parse text channel data
    if (rawData.type === ChannelTypes.TEXT) channelData = {
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
    } as TextChannelData;

    // Parse DM channel data
    else if (rawData.type === ChannelTypes.DM) channelData = {
        id: rawData.id,
        type: rawData.type,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        recipient: (rawData.recipients as RawUserData[])[0].id,
        fetchedAt: Date.now()
    } as DMChannelData;

    // Parse voice channel data
    else if (rawData.type === ChannelTypes.VOICE) channelData = {
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
        videoQualityMode: rawData.video_quality_mode || VideoQualityModes.AUTO,
        fetchedAt: Date.now()
    } as VoiceChannelData;

    // Parse category channel data
    else if (rawData.type === ChannelTypes.CATEGORY) channelData = {
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
    } as CategoryChannelData;

    // Parse news channel data
    else if (rawData.type === ChannelTypes.NEWS) channelData = {
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
    } as NewsChannelData;

    // Parse store channel data
    else if (rawData.type === ChannelTypes.STORE) channelData = {
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
    } as StoreChannelData;

    // Parse stage channel data
    else if (rawData.type === ChannelTypes.STAGE) channelData = {
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
    } as StageChannelData;

    // Parse thread channel data
    else if ((rawData.type === ChannelTypes.NEWS_THREAD) || (rawData.type === ChannelTypes.PUBLIC_THREAD) || (rawData.type === ChannelTypes.PRIVATE_THREAD)) channelData = {
        id: rawData.id,
        type: rawData.type,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        parentID: rawData.parent_id as string,
        creatorID: rawData.owner_id as string,
        archived: (rawData.thread_metadata as RawChannelDataThreadMetadata).archived,
        autoArchivedDuration: (rawData.thread_metadata as RawChannelDataThreadMetadata).auto_archive_duration,
        archivedAt: new Date((rawData.thread_metadata as RawChannelDataThreadMetadata).archive_timestamp).getTime(),
        locked: Boolean((rawData.thread_metadata as RawChannelDataThreadMetadata).locked),
        member: rawData.member && {
            id: rawData.id,
            userID: client.id,
            joinTimestamp: new Date(rawData.member.join_timestamp).getTime(),
            flags: rawData.member.flags
        },
        messageCount: rawData.message_count as number,
        memberCount: rawData.member_count as number,
        lastMessageID: rawData.last_message_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null,
        fetchedAt: Date.now()
    } as ThreadChannelData;

    // Unknown channel type
    else throw new Error(`Unknown channel type '${rawData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Set channel permissions
    if (("guildID" in channelData) && (!("archived" in channelData))) client._channelPermissions.set(channelData.id, {
        guildID: channelData.guildID,
        permissionOverwrites: channelData.permissionOverwrites
    });

    // Recalculate thread permissions
    if ("guildID" in channelData) ThreadChannel._recalculateThreadPermissions(client, channelData.guildID);

    // Return
    return channelData;
}