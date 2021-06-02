import { PrivacyLevel } from "../../internal";

export interface RawStageInstanceData {
    id: string;
    guild_id: string;
    channel_id: string;
    topic: string;
    privacy_level: PrivacyLevel;
    discoverable_disabled: boolean;
}