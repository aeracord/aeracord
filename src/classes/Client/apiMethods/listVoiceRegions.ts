import { Client, FetchQueue, VoiceRegion } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseVoiceRegion from "../events/parseVoiceRegion";
import { RawVoiceRegionData } from "../events/rawVoiceRegionData";

export default async function listVoiceRegions(client: Client): Promise<VoiceRegion[]> {

    // Define fetch data
    const path: string = "/voice/regions";
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