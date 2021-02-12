import { Client, User } from "../../../../internal";
import parseUser from "../parseUser";
import { RawGuildBanRemoveData } from "./rawGuildBanRemoveData";

export default function guildBanRemove(client: Client, rawData: RawGuildBanRemoveData) {

    // Parse user
    const user: User = parseUser(client, rawData.user);

    // Emit event
    client.emit("guildBanRemove", user, rawData);
}