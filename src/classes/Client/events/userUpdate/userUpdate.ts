import { Client, RawUserData, User } from "../../../../internal";

export default function userUpdate(client: Client, rawData: RawUserData) {

    // Parse user
    const user: User = User._fromRawData(client, rawData);

    // Emit event
    client.emit("userUpdate", user, rawData);
}