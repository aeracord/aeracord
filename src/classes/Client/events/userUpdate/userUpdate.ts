import { Client, RawUserData, User, UserData } from "../../../../internal";

export default function userUpdate(client: Client, rawData: RawUserData) {

    // Get old user data
    const oldUser: User | undefined = client.users.get(rawData.id);
    const oldUserData: UserData | undefined = oldUser && User.toData(oldUser);

    // Parse user
    const user: User = User._fromRawData(client, rawData);

    // Emit event
    client.emit("userUpdate", user, {
        rawData,
        oldUserData
    });
}