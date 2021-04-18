import { Client, RawVoiceStateData, VoiceState } from "../../../../internal";

export default function voiceStateUpdate(client: Client, rawData: RawVoiceStateData) {

    // Parse voice state
    const voiceState: VoiceState = VoiceState._fromRawData(client, rawData);

    // Emit event
    client.emit("voiceStateUpdate", voiceState, {
        rawData,
        guild: client.guilds.get(voiceState.guildID),
        channel: client.channels.get(voiceState.channelID),
        member: client.members.get(voiceState.guildID, voiceState.userID),
        user: client.users.get(voiceState.userID)
    });
}