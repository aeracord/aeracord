import { Member, VoiceState, VoiceStateData } from "../../internal";

export default function toData(voiceState: VoiceState): VoiceStateData {

    // Parse voiceState data
    return {
        guildID: voiceState.guildID,
        channelID: voiceState.channelID,
        userID: voiceState.userID,
        member: Member.toData(voiceState.member),
        sessionID: voiceState.sessionID,
        muted: voiceState.muted,
        deafened: voiceState.deafened,
        selfMuted: voiceState.selfMuted,
        selfDeafened: voiceState.selfDeafened,
        selfStream: voiceState.selfStream,
        selfVideo: voiceState.selfVideo,
        suppress: voiceState.suppress
    };
}