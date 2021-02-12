import { Client, Member } from "../../../../internal";
import parseMember from "../parseMember";
import { RawGuildMemberAddData } from "./rawGuildMemberAddData";

export default function guildMemberAdd(client: Client, rawData: RawGuildMemberAddData) {

    // Parse member
    const member: Member = parseMember(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("guildMemberAdd", member, rawData);
}