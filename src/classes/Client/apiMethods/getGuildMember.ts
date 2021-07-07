import { APIError, Client, FetchQueue, Guild, GuildResolvable, Member, RawMemberData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<Member | undefined> {

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
    let unknownMember: boolean = false;
    const result: RawMemberData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown member
        if (
            err.code === 10007 ||
            err.errors?.guild_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE" ||
            err.errors?.user_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE"
        ) unknownMember = true;

        // Throw error
        else throw err;
    });

    // Unknown member
    if (unknownMember) return;

    // Parse member
    const member: Member = Member._fromRawData(client, result, guildID);

    // Return
    return member;
}