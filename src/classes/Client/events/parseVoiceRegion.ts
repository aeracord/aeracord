import { VoiceRegion } from "../../../internal";
import { RawVoiceRegionData } from "./rawVoiceRegionData";

/**
 * Parse Voice Region
 *
 * A voice region object is currently identical to a raw voice region object from the API
 * However, this module should still be used to convert from a `RawVoiceRegionData` object to a `VoiceRegion` object in case this changes in the future
 */
export default function parseVoiceRegion(rawData: RawVoiceRegionData): VoiceRegion {

    // Parse voice region
    const voiceRegion: VoiceRegion = rawData;

    // Return
    return voiceRegion;
}