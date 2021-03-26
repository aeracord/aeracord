import { Client, RawVoiceStateData, VoiceState, VoiceStateData } from "../../../../internal";

export default function voiceStateUpdate(client: Client, rawData: RawVoiceStateData) {

    // Parse voice state data
    const voiceStateData: VoiceStateData = VoiceState._fromRawData(client, rawData);

    // Emit event
    client.emit("voiceStateUpdate", voiceStateData, {
        rawData,
        guild: client.guilds.get(voiceStateData.guildID),
        channel: client.channels.get(voiceStateData.channelID),
        member: client.members.get(voiceStateData.guildID, voiceStateData.userID),
        user: client.users.get(voiceStateData.userID)
    });
}