import { Client, User } from "../../../../internal";
import parseUser from "../parseUser";
import { RawUserData } from "../rawUserData";

export default function userUpdate(client: Client, rawData: RawUserData) {

    // Parse user
    const user: User = parseUser(client, rawData);

    // Emit event
    client.emit("userUpdate", user, rawData);
}