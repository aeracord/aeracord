import { Client, Command, CommandPermissions, CommandResolvable, FetchQueue, Guild, GuildResolvable, RawCommandPermissionsData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildCommandPermissions(client: Client, guildResolvable: GuildResolvable, commandResolvable: CommandResolvable): Promise<CommandPermissions> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/${commandID}/permissions`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandPermissionsData = await fetchQueue.request({
        path,
        method
    });

    // Parse command permissions
    const commandPermissions: CommandPermissions = CommandPermissions._fromRawData(client, result);

    // Return
    return commandPermissions;
}