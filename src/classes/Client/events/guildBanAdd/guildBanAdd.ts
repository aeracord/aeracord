import { Client, User, UserData } from "../../../../internal";
import { RawGuildBanAddData } from "./rawGuildBanAddData";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse user data
    const userData: UserData = User._fromRawData(rawData.user);

    // Emit event
    client.emit("guildBanAdd", userData, rawData);
}