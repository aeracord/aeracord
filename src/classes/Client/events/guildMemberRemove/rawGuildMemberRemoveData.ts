import { RawUserData } from "../rawUserData";

export interface RawGuildMemberRemoveData {
    guild_id: string;
    user: RawUserData;
}