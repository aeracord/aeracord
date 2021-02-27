import { Client, Member } from "../../../../internal";
import { RawGuildMemberAddData } from "./rawGuildMemberAddData";

export default function guildMemberAdd(client: Client, rawData: RawGuildMemberAddData) {

    // Parse member
    const member: Member = Member._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("guildMemberAdd", member, rawData);
}