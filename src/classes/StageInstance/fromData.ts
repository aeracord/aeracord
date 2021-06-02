import { Client, StageInstance, StageInstanceData } from "../../internal";

export default function fromData(client: Client, stageInstanceData: StageInstanceData): StageInstance {

    // Create stage instance
    const stageInstance: StageInstance = new StageInstance(client, stageInstanceData);

    // Return
    return stageInstance;
}