import { Client, Command, CommandTypes, CreateCommandData, FetchQueue, Guild, GuildResolvable, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function createGuildCommand(client: Client, guildResolvable: GuildResolvable, createCommandData: CreateCommandData): Promise<Command> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createCommandData.name,
            type: createCommandData.type,
            description: createCommandData.type === CommandTypes.CHAT_INPUT ? createCommandData.description : undefined,
            options: createCommandData.type === CommandTypes.CHAT_INPUT ? createCommandData.options : undefined,
            default_permission: createCommandData.defaultPermission
        }
    });

    // Parse command
    const command: Command = Command._fromRawData(client, result, guildID);

    // Return
    return command;
}