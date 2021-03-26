import { Client, RawUserData, User, UserData } from "../../../../internal";

export default function userUpdate(client: Client, rawData: RawUserData) {

    // Parse user data
    const userData: UserData = User._fromRawData(client, rawData);

    // Emit event
    client.emit("userUpdate", userData, {
        rawData,
        user: client.users.get(userData.id)
    });
}