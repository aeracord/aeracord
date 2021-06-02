import { APIError, Channel, ChannelResolvable, Client, FetchQueue, RawStageInstanceData, StageInstance } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getStageInstance(client: Client, channelResolvable: ChannelResolvable): Promise<StageInstance | undefined> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Define fetch data
    const path: string = `/stage-instances/${channelID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownStageInstance: boolean = false;
    const result: RawStageInstanceData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown stage instance
        if (err.code === 10067) unknownStageInstance = true;

        // Throw error
        else throw err;
    });

    // Unknown stage instance
    if (unknownStageInstance) return;

    // Parse stage instance
    const stageInstance: StageInstance = StageInstance._fromRawData(client, result);

    // Return
    return stageInstance;
}