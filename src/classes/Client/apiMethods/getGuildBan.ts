import { APIError, Ban, Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawBanData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<Ban | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Missing permissions
    if (!client.hasPermission("BAN_MEMBERS", guildID)) throw new PermissionError({ permission: "BAN_MEMBERS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownBan: boolean = false;
    const result: RawBanData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown ban
        if (
            err.code === 10026 ||
            err.errors?.guild_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE" ||
            err.errors?.user_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE"
        ) unknownBan = true;

        // Throw error
        else throw err;
    });

    // Unknown ban
    if (unknownBan) return;

    // Parse ban
    const ban: Ban = Ban._fromRawData(client, result, guildID);

    // Return
    return ban;
}