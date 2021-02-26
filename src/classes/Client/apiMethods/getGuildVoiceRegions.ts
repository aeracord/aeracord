import { Client, FetchQueue, Guild, GuildResolvable, VoiceRegion } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseVoiceRegion from "../events/parseVoiceRegion";
import { RawVoiceRegionData } from "../events/rawVoiceRegionData";

export default async function getGuildVoiceRegions(client: Client, guildResolvable: GuildResolvable): Promise<VoiceRegion[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/regions`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawVoiceRegionData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse voice regions
    const voiceRegion: VoiceRegion[] = result.map((vr: RawVoiceRegionData) => parseVoiceRegion(vr));

    // Return
    return voiceRegion;
}