import { Client, Member, RawVoiceStateData, VoiceStateData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawVoiceStateData): VoiceStateData {

    // Parse voice state data
    return {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        userID: rawData.user_id,
        member: rawData.member && Member._dataFromRawData(client, rawData.member, rawData.guild_id),
        sessionID: rawData.session_id,
        muted: rawData.mute,
        deafened: rawData.deaf,
        selfMuted: rawData.self_mute,
        selfDeafened: rawData.self_deaf,
        selfStream: Boolean(rawData.self_stream),
        selfVideo: rawData.self_video,
        suppress: rawData.suppress,
        requestToSpeakTimestamp: rawData.request_to_speak_timestamp ? new Date(rawData.request_to_speak_timestamp).getTime() : null
    };
}