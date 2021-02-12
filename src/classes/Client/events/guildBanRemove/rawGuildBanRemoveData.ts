import { RawUserData } from "../rawUserData";

export interface RawGuildBanRemoveData {
    guild_id: string;
    user: RawUserData;
}