import { Channel, Client, Guild, Member, Presence, RawChannelData, RawMemberData, RawPresenceData, RawVoiceStateData, VoiceState } from "../../../../internal";
import ready from "../ready";
import { GuildCreateData } from "./guildCreateData";
import { RawGuildCreateData } from "./rawGuildCreateData";

export default function guildCreate(client: Client, rawData: RawGuildCreateData) {

    // Parse data
    const data: GuildCreateData = {
        guild: Guild._fromRawData(rawData),
        joinedAt: new Date(rawData.joined_at).getTime(),
        large: rawData.large,
        memberCount: rawData.member_count,
        voiceStates: rawData.voice_states.map((vs: RawVoiceStateData) => VoiceState._fromRawData(vs)),
        members: rawData.members.map((m: RawMemberData) => Member._fromRawData(m, rawData.id)),

        // Note that channel objects dont have a guild ID in the `guildCreate` event
        channels: rawData.channels.map((c: RawChannelData) => Channel._fromRawData({ ...c, guild_id: rawData.id })),

        presences: rawData.presences.map((p: RawPresenceData) => Presence._fromRawData(p))
    };

    // Initial guild create event
    if (client._uninitializedGuilds.has(data.guild.id)) {

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
        client.emit("guildAvailable", data, rawData);
    }

    // Emit event
    else client.emit("guildCreate", data, rawData);
}