import { RawUserData } from "../../../internal";

export interface RawBanData {
    user: RawUserData;
    reason: string | null;
}