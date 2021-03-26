import { Client, RawUserData, User, UserData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawUserData): UserData {

    // Parse user data
    const userData: UserData = {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatar: rawData.avatar,
        bot: Boolean(rawData.bot),
        system: Boolean(rawData.system),
        publicFlags: rawData.public_flags || 0
    };

    // Create user object
    if (client._users.cacheAll) User.fromData(client, userData);

    // Return
    return userData;
}