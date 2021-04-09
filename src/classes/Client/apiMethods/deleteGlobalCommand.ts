import { Client, Command, CommandResolvable, FetchQueue } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGlobalCommand(client: Client, commandResolvable: CommandResolvable): Promise<void> {

    // Resolve objects
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/commands/${commandID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}