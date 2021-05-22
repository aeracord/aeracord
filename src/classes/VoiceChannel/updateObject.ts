import { GuildChannel, VoiceChannel, VoiceChannelData } from "../../internal";

export default function updateObject(voiceChannel: VoiceChannel, voiceChannelData: VoiceChannelData, fromConstructor?: boolean) {

    // Set data
    voiceChannel.bitrate = voiceChannelData.bitrate;
    voiceChannel.userLimit = voiceChannelData.userLimit;
    voiceChannel.videoQualityMode = voiceChannelData.videoQualityMode;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class voice channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(voiceChannel, voiceChannelData);
}