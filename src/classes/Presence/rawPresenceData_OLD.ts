import { ActivityType, Status } from "../../internal";

export interface RawPresenceData {
    user: RawPresenceDataUser;
    status: Status;
    activities: RawPresenceDataActivity[];
    client_status: RawPresenceDataClientStatus;
}

export interface RawPresenceDataUser {
    id: string;
    username?: string;
    discriminator?: string;
    avatar?: string | null;
    bot?: boolean;
    system?: boolean;
    public_flags?: number;
}

export interface RawPresenceDataActivity {
    name: string;
    type: ActivityType;
    url?: string | null;
    created_at: number;
    timestamps?: RawPresenceDataActivityTimestamps;
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: RawPresenceDataActivityEmoji | null;
    party?: RawPresenceDataActivityParty | null;
    assets?: RawPresenceDataActivityAssets;
    secrets?: RawPresenceDataActivitySecrets;
    instance?: boolean;
    flags?: number;
}

export interface RawPresenceDataActivityTimestamps {
    start?: number;
    end?: number;
}

export interface RawPresenceDataActivityEmoji {
    id?: string;
    name: string;
    animated?: boolean;
}

export interface RawPresenceDataActivityParty {
    id?: string;
    size?: number[];
}

export interface RawPresenceDataActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export interface RawPresenceDataActivitySecrets {
    join?: string;
    spectate?: string;
    match?: string;
}

export interface RawPresenceDataClientStatus {
    desktop?: Status;
    mobile?: Status;
    web?: Status;
}