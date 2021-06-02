import { RawStageInstanceData, StageInstanceData } from "../../internal";

export default function dataFromRawData(rawData: RawStageInstanceData): StageInstanceData {

    // Parse stage instance data
    return {
        id: rawData.id,
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        topic: rawData.topic,
        privacyLevel: rawData.privacy_level,
        discoverableDisabled: rawData.discoverable_disabled
    };
}