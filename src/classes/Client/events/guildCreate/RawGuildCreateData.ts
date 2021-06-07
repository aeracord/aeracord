import { RawChannelData, RawGuildData, RawMemberData, RawPresenceData, RawStageInstanceData, RawVoiceStateData } from "../../../../internal";

export interface RawGuildCreateData extends RawGuildData {
    joined_at: string;
    large: boolean;
    unavailable: boolean;
    member_count: number;
    voice_states: RawVoiceStateData[];
    members: RawMemberData[];
    channels: RawChannelData[];
    presences: RawPresenceData[];
    stage_instances: RawStageInstanceData[];
}