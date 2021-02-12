import { RawUserData } from "../rawUserData";

export interface RawGuildBanAddData {
    guild_id: string;
    user: RawUserData;
}