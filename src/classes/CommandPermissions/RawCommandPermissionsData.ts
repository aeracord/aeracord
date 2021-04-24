import { CommandPermission } from "../../internal";

export interface RawCommandPermissionsData {
    id: string;
    guild_id: string | null;
    application_id: string;
    permissions: CommandPermission[];
}