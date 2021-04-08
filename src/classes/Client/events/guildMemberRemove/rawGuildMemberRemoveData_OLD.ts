import { RawUserData } from "../../../../internal";

export interface RawGuildMemberRemoveData {
    guild_id: string;
    user: RawUserData;
}