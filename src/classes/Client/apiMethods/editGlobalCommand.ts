import { Client, Command, CommandOption, CommandResolvable, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface EditCommandData {
    name?: string;
    description?: string;
    options?: CommandOption[] | null;
}

export default async function editGlobalCommand(client: Client, commandResolvable: CommandResolvable, editCommandData: EditCommandData): Promise<Command> {

    // Resolve objects
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/commands/${commandID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData = await fetchQueue.request({
        path,
        method,
        data: {
            name: editCommandData.name,
            description: editCommandData.description,
            options: editCommandData.options
        }
    });

    // Parse command
    const command: Command = Command._fromRawData(client, result);

    // Return
    return command;
}