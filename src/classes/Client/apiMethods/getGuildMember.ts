import { Client, FetchQueue, Guild, GuildResolvable, Member, MemberData, RawMemberData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<MemberData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMemberData = await fetchQueue.request({
        path,
        method
    });

    // Parse member data
    const memberData: MemberData = Member._fromRawData(result, guildID);

    // Return
    return memberData;
}