import { Client, Command, CommandData, CommandResolvable, EditCommandData, FetchQueue, Guild, GuildResolvable, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function editGuildCommand(client: Client, guildResolvable: GuildResolvable, commandResolvable: CommandResolvable, editCommandData: EditCommandData): Promise<CommandData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/${commandID}`;
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

    // Parse command data
    const commandData: CommandData = Command._fromRawData(client, result, guildID);

    // Return
    return commandData;
}