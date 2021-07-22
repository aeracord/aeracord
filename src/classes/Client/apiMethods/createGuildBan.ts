import { Client, FetchQueue, Guild, GuildResolvable, Member, PermissionError, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildBanData {
    deleteMessagesDays?: number;
    reason?: string;
}

export default async function createGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, createGuildBanData: CreateGuildBanData = {}, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Missing permissions
    if (!client.hasPermission("BAN_MEMBERS", guildID)) throw new PermissionError({ permission: "BAN_MEMBERS" });
    if ((userResolvable instanceof Member) && (!client.canManageMember(userResolvable))) throw new PermissionError({ member: userResolvable.user.id });

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: {
            delete_message_days: createGuildBanData.deleteMessagesDays,
            reason: createGuildBanData.reason
        },
        auditLogReason: reason
    });
}