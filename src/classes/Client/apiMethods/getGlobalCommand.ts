import { Client, Command, CommandResolvable, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGlobalCommand(client: Client, commandResolvable: CommandResolvable): Promise<Command> {

    // Resolve objects
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/commands/${commandID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData = await fetchQueue.request({
        path,
        method
    });

    // Parse command
    const command: Command = Command._fromRawData(client, result);

    // Return
    return command;
}