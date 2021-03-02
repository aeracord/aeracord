import queryString from "query-string";
import { Client, Feature, FetchQueue } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetCurrentUserGuildsData {
    limit?: number;
    before?: string;
    after?: string;
}

export interface PartialGuild {
    id: string;
    name: string;
    icon?: string;
    permissions: string;
    features: Feature[];
}

interface RawPartialGuild {
    id: string;
    name: string;
    icon: string | null;
    permissions: string;
    features: Feature[];
}

export default async function getCurrentUserGuilds(client: Client, getCurrentUserGuildsData: GetCurrentUserGuildsData = {}): Promise<PartialGuild[]> {

    // Define fetch data
    const path: string = `/users/@me/guilds?${queryString.stringify({
        limit: getCurrentUserGuildsData.limit,
        before: getCurrentUserGuildsData.before,
        after: getCurrentUserGuildsData.after
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawPartialGuild[] = await fetchQueue.request({
        path,
        method
    });

    // Parse guilds
    const guilds: PartialGuild[] = result.map((g: RawPartialGuild) => ({
        id: g.id,
        name: g.name,
        icon: g.icon || undefined,
        permissions: g.permissions,
        features: g.features
    }));

    // Return
    return guilds;
}