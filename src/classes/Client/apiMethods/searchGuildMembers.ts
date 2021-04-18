import queryString from "query-string";
import { Client, FetchQueue, Guild, GuildResolvable, Member, RawMemberData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface SearchGuildMembersData {
    query: string;
    limit?: number;
}

export default async function searchGuildMembers(client: Client, guildResolvable: GuildResolvable, searchGuildMembersData: SearchGuildMembersData): Promise<Member[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/search?${queryString.stringify({
        query: searchGuildMembersData.query,
        limit: searchGuildMembersData.limit
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMemberData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse members
    const members: Member[] = result.map((m: RawMemberData) => Member._fromRawData(client, m, guildID));

    // Return
    return members;
}