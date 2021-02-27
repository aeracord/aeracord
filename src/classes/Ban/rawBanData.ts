import { RawUserData } from "../../internal";

export default interface RawBanData {
    user: RawUserData;
    reason: string | null;
}