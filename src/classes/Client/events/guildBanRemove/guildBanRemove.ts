import { Client, User } from "../../../../internal";
import { RawGuildBanRemoveData } from "./rawGuildBanRemoveData";

export default function guildBanRemove(client: Client, rawData: RawGuildBanRemoveData) {

    // Parse user
    const user: User = User._fromRawData(client, rawData.user);

    // Emit event
    client.emit("guildBanRemove", user, rawData);
}