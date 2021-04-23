import { RawMemberData } from "../../../../internal";

export interface RawGuildMemberUpdateData extends RawMemberData {
    guild_id: string;
}