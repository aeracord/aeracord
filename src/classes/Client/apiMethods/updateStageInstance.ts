import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError, PrivacyLevel, RawStageInstanceData, StageInstance } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface UpdateStageInstanceData {
    topic?: string;
    privacyLevel?: PrivacyLevel;
}

export default async function updateStageInstance(client: Client, channelResolvable: ChannelResolvable, updateStageInstanceData: UpdateStageInstanceData): Promise<StageInstance> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_CHANNELS", channelID)) throw new PermissionError({ permission: "MANAGE_CHANNELS" });
    if (!client.hasPermission("MUTE_MEMBERS", channelID)) throw new PermissionError({ permission: "MUTE_MEMBERS" });
    if (!client.hasPermission("MOVE_MEMBERS", channelID)) throw new PermissionError({ permission: "MOVE_MEMBERS" });

    // Define fetch data
    const path: string = `/stage-instances/${channelID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawStageInstanceData = await fetchQueue.request({
        path,
        method,
        data: {
            topic: updateStageInstanceData.topic,
            privacy_level: updateStageInstanceData.privacyLevel
        }
    });

    // Parse stage instance
    const stageInstance: StageInstance = StageInstance._fromRawData(client, result);

    // Return
    return stageInstance;
}