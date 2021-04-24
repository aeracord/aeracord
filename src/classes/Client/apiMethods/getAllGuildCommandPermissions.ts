import { Client, CommandPermissions, FetchQueue, Guild, GuildResolvable, RawCommandPermissionsData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getAllGuildCommandPermissions(client: Client, guildResolvable: GuildResolvable): Promise<CommandPermissions[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/permissions`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandPermissionsData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse commands permissions
    const commandPermissions: CommandPermissions[] = result.map((p: RawCommandPermissionsData) => CommandPermissions._fromRawData(client, p));

    // Return
    return commandPermissions;
}