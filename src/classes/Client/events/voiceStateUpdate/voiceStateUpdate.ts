import { Client, RawVoiceStateData, VoiceState, VoiceStateData } from "../../../../internal";

export default function voiceStateUpdate(client: Client, rawData: RawVoiceStateData) {

    // Parse voice state data
    const voiceStateData: VoiceStateData = VoiceState._fromRawData(rawData);

    // Emit event
    client.emit("voiceStateUpdate", voiceStateData, rawData);
}