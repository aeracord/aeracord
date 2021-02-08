export interface RawRoleData {
    role: RawRoleDataRole;
    guild_id: string;
}

export interface RawRoleDataRole {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    mentionable: boolean;
    managed: boolean;
    tags?: RawRoleDataTags;
}

export interface RawRoleDataTags {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
}