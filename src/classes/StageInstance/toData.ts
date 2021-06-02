import { StageInstance, StageInstanceData } from "../../internal";

export default function toData(stageInstance: StageInstance): StageInstanceData {

    // Parse stage instance data
    return {
        id: stageInstance.id,
        guildID: stageInstance.guildID,
        channelID: stageInstance.channelID,
        topic: stageInstance.topic,
        privacyLevel: stageInstance.privacyLevel,
        discoverableDisabled: stageInstance.discoverableDisabled
    };
}