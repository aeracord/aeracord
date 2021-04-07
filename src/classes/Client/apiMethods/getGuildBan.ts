import { Ban, BanData, Client, FetchQueue, Guild, GuildResolvable, RawBanData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<BanData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("BAN_MEMBERS", guildID))) throw new Error("Missing ban members permissions");

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawBanData = await fetchQueue.request({
        path,
        method
    });

    // Parse ban data
    const banData: BanData = Ban._fromRawData(client, result, guildID);

    // Return
    return banData;
}