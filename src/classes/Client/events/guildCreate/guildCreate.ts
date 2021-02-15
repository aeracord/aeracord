import { Client } from "../../../../internal";
import parseChannel from "../parseChannel";
import parseGuild from "../parseGuild";
import parseMember from "../parseMember";
import parsePresence from "../parsePresence";
import parseVoiceState from "../parseVoiceState";
import { RawChannelData } from "../rawChannelData";
import { RawMemberData } from "../rawMemberData";
import { RawPresenceData } from "../rawPresenceData";
import { RawVoiceStateData } from "../rawVoiceStateData";
import ready from "../ready";
import { GuildCreateData } from "./guildCreateData";
import { RawGuildCreateData } from "./rawGuildCreateData";

export default function guildCreate(client: Client, rawData: RawGuildCreateData) {

    // Parse data
    const data: GuildCreateData = {
        guild: parseGuild(client, rawData),
        joinedAt: new Date(rawData.joined_at).getTime(),
        large: rawData.large,
        memberCount: rawData.member_count,
        voiceStates: rawData.voice_states.map((vs: RawVoiceStateData) => parseVoiceState(client, vs)),
        members: rawData.members.map((m: RawMemberData) => parseMember(client, m, rawData.id)),
        channels: rawData.channels.map((c: RawChannelData) => parseChannel(client, c)),
        presences: rawData.presences.map((p: RawPresenceData) => parsePresence(client, p))
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