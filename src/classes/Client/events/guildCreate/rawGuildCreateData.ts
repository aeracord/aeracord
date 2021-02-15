import { RawChannelData } from "../rawChannelData";
import { RawGuildData } from "../rawGuildData";
import { RawMemberData } from "../rawMemberData";
import { RawPresenceData } from "../rawPresenceData";
import { RawVoiceStateData } from "../rawVoiceStateData";

export interface RawGuildCreateData extends RawGuildData {
    joined_at: string;
    large: boolean;
    unavailable: boolean;
    member_count: number;
    voice_states: RawVoiceStateData[];
    members: RawMemberData[];
    channels: RawChannelData[];
    presences: RawPresenceData[];
}