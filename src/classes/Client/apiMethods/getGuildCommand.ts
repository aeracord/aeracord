import { APIError, Client, Command, CommandResolvable, FetchQueue, Guild, GuildResolvable, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildCommand(client: Client, guildResolvable: GuildResolvable, commandResolvable: CommandResolvable): Promise<Command | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/${commandID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownCommand: boolean = false;
    const result: RawCommandData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown command
        if (
            err.code === 10063 ||
            err.errors?.guild_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE" ||
            err.errors?.command_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE"
        ) unknownCommand = true;

        // Throw error
        else throw err;
    });

    // Unknown command
    if (unknownCommand) return;

    // Parse command
    const command: Command = Command._fromRawData(client, result, guildID);

    // Return
    return command;
}