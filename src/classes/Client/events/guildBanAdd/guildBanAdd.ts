import { Client, User } from "../../../../internal";
import parseUser from "../parseUser";
import { RawGuildBanAddData } from "./rawGuildBanAddData";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse user
    const user: User = parseUser(client, rawData.user);

    // Emit event
    client.emit("guildBanAdd", user, rawData);
}