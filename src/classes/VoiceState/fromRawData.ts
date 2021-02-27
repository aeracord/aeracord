import { Client, Member, RawVoiceStateData, VoiceState } from "../../internal";

export default function fromRawData(client: Client, rawData: RawVoiceStateData): VoiceState {

    // Parse voice state
    const voiceState: VoiceState = new VoiceState(client, {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        userID: rawData.user_id,
        member: Member._fromRawData(client, rawData.member, rawData.guild_id),
        sessionID: rawData.session_id,
        muted: rawData.mute,
        deafened: rawData.deaf,
        selfMuted: rawData.self_mute,
        selfDeafened: rawData.self_deaf,
        selfStream: rawData.self_stream,
        selfVideo: rawData.self_video,
        suppress: rawData.suppress
    });

    // Return
    return voiceState;
}