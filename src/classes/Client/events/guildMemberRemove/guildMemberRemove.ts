import { Client, User } from "../../../../internal";
import parseUser from "../parseUser";
import { RawGuildMemberRemoveData } from "./rawGuildMemberRemoveData";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse user
    const user: User = parseUser(client, rawData.user);

    // Emit event
    client.emit("guildMemberRemove", user, rawData);
}