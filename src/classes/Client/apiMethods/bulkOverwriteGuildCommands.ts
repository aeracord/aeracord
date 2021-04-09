import { Client, Command, CommandData, EditCommandData, FetchQueue, Guild, GuildResolvable, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function bulkOverwriteGuildCommands(client: Client, guildResolvable: GuildResolvable, editCommandData: EditCommandData[]): Promise<CommandData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands`;
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
    const commands: CommandData[] = result.map((c: RawCommandData) => Command._fromRawData(client, c, guildID));

    // Return
    return commands;
}