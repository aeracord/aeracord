import { RawMemberData } from "../rawMemberData";

export interface RawGuildMemberAddData extends RawMemberData {
    guild_id: string;
}