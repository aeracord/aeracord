import { Client, RawVoiceStateData, VoiceState } from "../../../../internal";

export default function voiceStateUpdate(client: Client, rawData: RawVoiceStateData) {

    // Parse voiceState
    const voiceState: VoiceState = VoiceState._fromRawData(client, rawData);

    // Emit event
    client.emit("voiceStateUpdate", voiceState, rawData);
}