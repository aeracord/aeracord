import { Client, RawUserData, User, UserData } from "../../../../internal";

export default function userUpdate(client: Client, rawData: RawUserData) {

    // Parse user data
    const userData: UserData = User._fromRawData(rawData);

    // Emit event
    client.emit("userUpdate", userData, rawData);
}