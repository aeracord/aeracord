import { AnyChannel, CategoryChannel, Client, DMChannel, NewsChannel, PermissionOverwrite, StoreChannel, TextChannel, VoiceChannel } from "../../../internal";
import { CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_DM, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, RawChannelData } from "./rawChannelData";
import { RawUserData } from "./rawUserData";

export default function parseChannel(client: Client, rawData: RawChannelData): AnyChannel {

    // Define channel
    let channel: AnyChannel;

    // Text channel
    if (rawData.type === CHANNEL_TYPE_TEXT) channel = new TextChannel(client, {
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
    });

    // DM channel
    else if (rawData.type === CHANNEL_TYPE_DM) channel = new DMChannel(client, {
        id: rawData.id,
        lastMessageID: rawData.last_message_id || undefined,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : undefined,
        recipient: (rawData.recipients as RawUserData[])[0].id
    });

    // Voice channel
    else if (rawData.type === CHANNEL_TYPE_VOICE) channel = new VoiceChannel(client, {
        id: rawData.id,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id || undefined,
        bitrate: rawData.bitrate,
        userLimit: rawData.user_limit
    });

    // Category channel
    else if (rawData.type === CHANNEL_TYPE_CATEGORY) channel = new CategoryChannel(client, {
        id: rawData.id,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id || undefined
    });

    // News channel
    else if (rawData.type === CHANNEL_TYPE_NEWS) channel = new NewsChannel(client, {
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
    });

    // Store channel
    else if (rawData.type === CHANNEL_TYPE_STORE) channel = new StoreChannel(client, {
        id: rawData.id,
        name: rawData.name as string,
        guildID: rawData.guild_id as string,
        position: rawData.position as number,
        permissionOverwrites: rawData.permission_overwrites as PermissionOverwrite[],
        parentID: rawData.parent_id || undefined
    });

    // Unknown channel type
    else throw new Error(`Unknown channel type '${rawData.type}'. Please open an issue about this at https://github.com/APixelVisuals/dislite`);

    // Return
    return channel;
}