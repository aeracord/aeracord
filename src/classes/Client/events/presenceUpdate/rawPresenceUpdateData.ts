import { ActivityType, Status } from "../../../../internal";

export interface RawPresenceUpdateData {
    user: RawPresenceUpdateDataUser;
    guild_id: string;
    status: Status;
    activities: RawPresenceUpdateDataActivity[];
    client_status: RawPresenceUpdateDataClientStatus;
}

export interface RawPresenceUpdateDataUser {
    id: string;
    username?: string;
    discriminator?: string;
    avatar?: string | null;
    bot?: boolean;
    system?: boolean;
    public_flags?: number;
}

export interface RawPresenceUpdateDataActivity {
    name: string;
    type: ActivityType;
    url?: string | null;
    created_at: number;
    timestamps?: RawPresenceUpdateDataActivityTimestamps;
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: RawPresenceUpdateDataActivityEmoji | null;
    party?: RawPresenceUpdateDataActivityParty | null;
    assets?: RawPresenceUpdateDataActivityAssets;
    secrets?: RawPresenceUpdateDataActivitySecrets;
    instance?: boolean;
    flags?: number;
}

export interface RawPresenceUpdateDataActivityTimestamps {
    start?: number;
    end?: number;
}

export interface RawPresenceUpdateDataActivityEmoji {
    id?: string;
    name: string;
    animated?: boolean;
}

export interface RawPresenceUpdateDataActivityParty {
    id?: string;
    size?: number[];
}

export interface RawPresenceUpdateDataActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export interface RawPresenceUpdateDataActivitySecrets {
    join?: string;
    spectate?: string;
    match?: string;
}

export interface RawPresenceUpdateDataClientStatus {
    desktop?: Status;
    mobile?: Status;
    web?: Status;
}