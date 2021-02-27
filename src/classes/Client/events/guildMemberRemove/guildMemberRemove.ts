import { Client, User } from "../../../../internal";
import { RawGuildMemberRemoveData } from "./rawGuildMemberRemoveData";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse user
    const user: User = User._fromRawData(client, rawData.user);

    // Emit event
    client.emit("guildMemberRemove", user, rawData);
}