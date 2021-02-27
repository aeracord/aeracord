import { Client, User } from "../../../../internal";
import { RawGuildBanAddData } from "./rawGuildBanAddData";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse user
    const user: User = User._fromRawData(client, rawData.user);

    // Emit event
    client.emit("guildBanAdd", user, rawData);
}