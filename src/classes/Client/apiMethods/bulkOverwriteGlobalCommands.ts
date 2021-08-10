import { Client, Command, CommandType, EditCommandData, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface BulkOverwriteCommandData extends EditCommandData {
    type?: CommandType;
}

export default async function bulkOverwriteGlobalCommands(client: Client, bulkOverwriteCommandData: BulkOverwriteCommandData[]): Promise<Command[]> {

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
        data: bulkOverwriteCommandData.map((c: BulkOverwriteCommandData) => ({
            name: c.name,
            type: c.type,
            description: c.description,
            options: c.options,
            default_permission: c.defaultPermission
        }))
    });

    // Parse commands
    const commands: Command[] = result.map((c: RawCommandData) => Command._fromRawData(client, c));

    // Return
    return commands;
}