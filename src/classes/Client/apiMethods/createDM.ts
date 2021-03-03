import { Channel, Client, DMChannel, FetchQueue, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateDMData {
    recipient: string;
}

export default async function createDM(client: Client, createDMData: CreateDMData): Promise<DMChannel> {

    // Define fetch data
    const path: string = "/users/@me/channels";
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        data: {
            recipient_id: createDMData.recipient
        }
    });

    // Parse channel
    const channel: DMChannel = Channel._fromRawData(client, result) as DMChannel;

    // Return
    return channel;
}