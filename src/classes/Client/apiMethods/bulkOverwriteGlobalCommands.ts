import { Client, Command, EditCommandData, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function bulkOverwriteGlobalCommands(client: Client, editCommandData: EditCommandData[]): Promise<Command[]> {

    // Define fetch data
    const path: string = `/applications/${client.id}/commands`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData[] = await fetchQueue.request({
        path,
        method,
        data: editCommandData
    });

    // Parse commands
    const commands: Command[] = result.map((c: RawCommandData) => Command._fromRawData(client, c));

    // Return
    return commands;
}