import { Client, User, UserData } from "../../../../internal";
import { RawGuildMemberRemoveData } from "./rawGuildMemberRemoveData";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse user data
    const userData: UserData = User._fromRawData(rawData.user);

    // Emit event
    client.emit("guildMemberRemove", userData, rawData);
}