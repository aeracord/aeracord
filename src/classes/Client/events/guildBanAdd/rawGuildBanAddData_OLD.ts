import { RawUserData } from "../../../../internal";

export interface RawGuildBanAddData {
    guild_id: string;
    user: RawUserData;
}