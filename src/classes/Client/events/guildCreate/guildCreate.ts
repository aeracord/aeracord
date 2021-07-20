import { AnyChannelData, Channel, Client, EmojiData, Guild, GuildCreateData, Member, MemberData, Presence, RawChannelData, RawGuildCreateData, RawMemberData, RawPresenceData, RawStageInstanceData, RawVoiceStateData, RoleData, StageInstance, ThreadChannelData, VoiceState } from "../../../../internal";
import ready from "../ready";
import cacheInitialObjects from "./cacheInitialObjects";

export default async function guildCreate(client: Client, rawData: RawGuildCreateData) {

    // Parse data
    const data: GuildCreateData = {
        guild: Guild._fromRawData(client, rawData),
        joinedAt: new Date(rawData.joined_at).getTime(),
        large: rawData.large,
        memberCount: rawData.member_count,
        voiceStates: rawData.voice_states.map((vs: RawVoiceStateData) => VoiceState._dataFromRawData(vs)),
        members: rawData.members.map((m: RawMemberData) => Member._dataFromRawData(m, rawData.id)),

        // Note that channel objects dont have a guild ID in the `guildCreate` event
        channels: rawData.channels.map((c: RawChannelData) => Channel._dataFromRawData(client, { ...c, guild_id: rawData.id })),

        threads: rawData.threads.map((c: RawChannelData) => Channel._dataFromRawData(client, c)) as ThreadChannelData[],
        presences: rawData.presences.map((p: RawPresenceData) => Presence._dataFromRawData(p)),
        stageInstances: rawData.stage_instances.map((s: RawStageInstanceData) => StageInstance._dataFromRawData(s))
    };

    // Set guild roles
    if (client._guildRoles) client._guildRoles.set(data.guild.id, data.guild.roleData.map((r: RoleData) => r.id));

    // Set guild channels
    if (client._guildChannels) client._guildChannels.set(data.guild.id, data.channels.map((c: AnyChannelData) => c.id));

    // Set guild threads
    if (client._guildThreads) client._guildThreads.set(data.guild.id, data.threads.map((t: ThreadChannelData) => t.id));

    // Set guild emojis
    if (client._guildEmojis) client._guildEmojis.set(data.guild.id, data.guild.emojiData.map((e: EmojiData) => e.id));

    // Set thread channels
    if (client._threadChannels) data.threads.forEach((t: ThreadChannelData) => client._threadChannels?.set(t.id, {
        type: t.type,
        parentID: t.parentID,
        createdByClient: t.creatorID === client.id
    }));

    // Set client roles
    const clientMember: MemberData = data.members.find((m: MemberData) => m.user.id === client.id) as MemberData;
    if (client._clientRoles) client._clientRoles.set(data.guild.id, clientMember.roles);

    // Set emoji guilds
    if (client._emojiGuilds) data.guild.emojiData.forEach((e: EmojiData) => client._emojiGuilds?.set(e.id, data.guild.id));

    // Initial guild create event
    if (client._uninitializedGuilds.has(data.guild.id)) {

        // Cache initial objects
        await cacheInitialObjects(client, data);

        // Remove from uninitialized guilds
        client._uninitializedGuilds.delete(data.guild.id);

        // Add to ready data
        client._readyData?.data.availableGuilds.push(data);

        // Ready
        if (client._uninitializedGuilds.size === 0) ready(client);
    }

    // Guild available
    else if (client._unavailableGuilds.has(data.guild.id)) {

        // Remove from unavailable guilds
        client._unavailableGuilds.delete(data.guild.id);

        // Emit event
        client.emit("guildAvailable", data, {
            rawData
        });
    }

    // Emit event
    else client.emit("guildCreate", data, {
        rawData
    });
}