import { RawUserData } from "../../../../internal";

export interface RawGuildBanRemoveData {
    guild_id: string;
    user: RawUserData;
}