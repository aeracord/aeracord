import { RawUserData } from "./rawUserData";

export interface RawBanData {
    user: RawUserData;
    reason: string | null;
}