import { Client, VoiceState, VoiceStateData } from "../../internal";

export default function fromData(client: Client, voiceStateData: VoiceStateData): VoiceState {

    // Create voice state
    const voiceState: VoiceState = new VoiceState(client, voiceStateData);

    // Return
    return voiceState;
}