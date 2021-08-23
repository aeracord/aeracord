import { AnyChannel, AnyChannelData, CategoryChannel, ChannelTypes, DMChannel, NewsChannel, PermissionOverwrite, StageChannel, StoreChannel, TextChannel, ThreadChannel, VoiceChannel } from "../../internal";

export default function toData(channel: AnyChannel): AnyChannelData {

    // Parse text channel data
    if (channel.type === ChannelTypes.TEXT) {
        const textChannel: TextChannel = channel as TextChannel;
        return {
            id: textChannel.id,
            type: textChannel.type,
            name: textChannel.name,
            guildID: textChannel.guildID,
            position: textChannel.position,
            permissionOverwrites: textChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: textChannel.parentID,
            lastMessageID: textChannel.lastMessageID,
            lastPinTimestamp: textChannel.lastPinTimestamp,
            topic: textChannel.topic,
            nsfw: textChannel.nsfw,
            rateLimitPerUser: textChannel.rateLimitPerUser,
            fetchedAt: textChannel._lastUpdatedAt
        };
    }

    // Parse DM channel data
    else if (channel.type === ChannelTypes.DM) {
        const dmChannel: DMChannel = channel as DMChannel;
        return {
            id: dmChannel.id,
            type: dmChannel.type,
            lastMessageID: dmChannel.lastMessageID,
            lastPinTimestamp: dmChannel.lastPinTimestamp,
            recipient: dmChannel.recipient,
            fetchedAt: dmChannel._lastUpdatedAt
        };
    }

    // Parse voice channel data
    else if (channel.type === ChannelTypes.VOICE) {
        const voiceChannel: VoiceChannel = channel as VoiceChannel;
        return {
            id: voiceChannel.id,
            type: voiceChannel.type,
            name: voiceChannel.name,
            guildID: voiceChannel.guildID,
            position: voiceChannel.position,
            permissionOverwrites: voiceChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: voiceChannel.parentID,
            bitrate: voiceChannel.bitrate,
            userLimit: voiceChannel.userLimit,
            videoQualityMode: voiceChannel.videoQualityMode,
            fetchedAt: voiceChannel._lastUpdatedAt
        };
    }

    // Parse category channel data
    else if (channel.type === ChannelTypes.CATEGORY) {
        const categoryChannel: CategoryChannel = channel as CategoryChannel;
        return {
            id: categoryChannel.id,
            type: categoryChannel.type,
            name: categoryChannel.name,
            guildID: categoryChannel.guildID,
            position: categoryChannel.position,
            permissionOverwrites: categoryChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: categoryChannel.parentID,
            fetchedAt: categoryChannel._lastUpdatedAt
        };
    }

    // Parse news channel data
    else if (channel.type === ChannelTypes.NEWS) {
        const newsChannel: NewsChannel = channel as NewsChannel;
        return {
            id: newsChannel.id,
            type: newsChannel.type,
            name: newsChannel.name,
            guildID: newsChannel.guildID,
            position: newsChannel.position,
            permissionOverwrites: newsChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: newsChannel.parentID,
            lastMessageID: newsChannel.lastMessageID,
            lastPinTimestamp: newsChannel.lastPinTimestamp,
            topic: newsChannel.topic,
            nsfw: newsChannel.nsfw,
            rateLimitPerUser: newsChannel.rateLimitPerUser,
            fetchedAt: newsChannel._lastUpdatedAt
        };
    }

    // Parse store channel data
    else if (channel.type === ChannelTypes.STORE) {
        const storeChannel: StoreChannel = channel as StoreChannel;
        return {
            id: storeChannel.id,
            type: storeChannel.type,
            name: storeChannel.name,
            guildID: storeChannel.guildID,
            position: storeChannel.position,
            permissionOverwrites: storeChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: storeChannel.parentID,
            fetchedAt: storeChannel._lastUpdatedAt
        };
    }

    // Parse stage channel data
    else if (channel.type === ChannelTypes.STAGE) {
        const stageChannel: StageChannel = channel as StageChannel;
        return {
            id: stageChannel.id,
            type: stageChannel.type,
            name: stageChannel.name,
            guildID: stageChannel.guildID,
            position: stageChannel.position,
            permissionOverwrites: stageChannel.permissionOverwrites.map((p: PermissionOverwrite) => ({
                id: p.id,
                type: p.type,
                allow: p.allow,
                deny: p.deny
            })),
            parentID: stageChannel.parentID,
            fetchedAt: stageChannel._lastUpdatedAt
        };
    }

    // Parse thread channel data
    else if ((channel.type === ChannelTypes.NEWS_THREAD) || (channel.type === ChannelTypes.PUBLIC_THREAD) || (channel.type === ChannelTypes.PRIVATE_THREAD)) {
        const threadChannel: ThreadChannel = channel as ThreadChannel;
        return {
            id: threadChannel.id,
            type: threadChannel.type,
            name: threadChannel.name,
            guildID: threadChannel.guildID,
            parentID: threadChannel.parentID,
            creatorID: threadChannel.creatorID,
            archived: threadChannel.archived,
            autoArchivedDuration: threadChannel.autoArchivedDuration,
            archivedAt: threadChannel.archivedAt,
            locked: threadChannel.locked,
            invitable: threadChannel.invitable,
            member: threadChannel.member,
            messageCount: threadChannel.messageCount,
            memberCount: threadChannel.memberCount,
            lastMessageID: threadChannel.lastMessageID,
            lastPinTimestamp: threadChannel.lastPinTimestamp,
            fetchedAt: threadChannel._lastUpdatedAt
        };
    }

    // Unknown channel type
    else throw new Error(`Unknown channel type '${channel.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
}