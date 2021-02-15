import { Client, VoiceState } from "../../../../internal";
import parseVoiceState from "../parseVoiceState";
import { RawVoiceStateData } from "../rawVoiceStateData";

export default function voiceStateUpdate(client: Client, rawData: RawVoiceStateData) {

    // Parse voiceState
    const voiceState: VoiceState = parseVoiceState(client, rawData);

    // Emit event
    client.emit("voiceStateUpdate", voiceState, rawData);
}