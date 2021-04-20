import { Client, FetchQueue, Guild, GuildResolvable, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyCurrentUserNicknameData {
    nickname?: string;
}

export interface CurrentUserNickname {
    nickname?: string;
}

interface RawCurrentUserNickname {
    nick: string | null;
}

export default async function modifyCurrentUserNickname(client: Client, guildResolvable: GuildResolvable, modifyCurrentUserNicknameData: ModifyCurrentUserNicknameData = {}): Promise<CurrentUserNickname> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("CHANGE_NICKNAME", guildID))) throw new PermissionError({ permission: "CHANGE_NICKNAME" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/@me/nick`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCurrentUserNickname = await fetchQueue.request({
        path,
        method,
        data: {
            nick: modifyCurrentUserNicknameData.nickname || null
        }
    });

    // Return
    return {
        nickname: result.nick || undefined
    };
}