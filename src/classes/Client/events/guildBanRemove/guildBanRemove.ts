import { Client, User, UserData } from "../../../../internal";
import { RawGuildBanRemoveData } from "./rawGuildBanRemoveData";

export default function guildBanRemove(client: Client, rawData: RawGuildBanRemoveData) {

    // Parse user data
    const userData: UserData = User._fromRawData(rawData.user);

    // Emit event
    client.emit("guildBanRemove", userData, rawData);
}