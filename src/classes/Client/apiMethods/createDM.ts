import { Channel, Client, DMChannel, FetchQueue, RawChannelData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateDMData {
    recipient: UserResolvable;
}

export default async function createDM(client: Client, createDMData: CreateDMData): Promise<DMChannel> {

    // Resolve objects
    const recipient: string | undefined = User.resolveID(createDMData.recipient);
    if (!recipient) throw new Error("Invalid user resolvable for recipient");

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
            recipient_id: recipient
        }
    });

    // Parse DM channel
    const dmChannel: DMChannel = Channel._fromRawData(client, result) as DMChannel;

    // Return
    return dmChannel;
}