import { Client, Emoji, Feature, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GuildPreview {
    id: string;
    name: string;
    icon?: string;
    splash?: string;
    discoverySplash?: string;
    emojis: Emoji[];
    features: Feature[];
    description?: string;
    approximateMemberCount: number;
    approximatePresenceCount: number;
}

interface RawGuildPreview {
    id: string;
    name: string;
    icon: string | null;
    splash: string | null;
    discovery_splash: string | null;
    emojis: RawEmojiData[];
    features: Feature[];
    description: string | null;
    approximate_member_count: number;
    approximate_presence_count: number;
}

export default async function getGuildPreview(client: Client, guildResolvable: GuildResolvable): Promise<GuildPreview> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/preview`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildPreview = await fetchQueue.request({
        path,
        method
    });

    // Return
    return {
        id: result.id,
        name: result.name,
        icon: result.icon || undefined,
        splash: result.splash || undefined,
        discoverySplash: result.discovery_splash || undefined,
        emojis: result.emojis.map((e: RawEmojiData) => Emoji._fromRawData(client, e)),
        features: result.features,
        description: result.description || undefined,
        approximateMemberCount: result.approximate_member_count,
        approximatePresenceCount: result.approximate_presence_count
    };
}