import { Client, Member, MemberData } from "../../../../internal";
import { RawGuildMemberAddData } from "./rawGuildMemberAddData";

export default function guildMemberAdd(client: Client, rawData: RawGuildMemberAddData) {

    // Parse member data
    const memberData: MemberData = Member._fromRawData(rawData, rawData.guild_id);

    // Emit event
    client.emit("guildMemberAdd", memberData, rawData);
}