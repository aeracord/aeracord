import { Client, RawUserData, User, UserData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawUserData): UserData {

    // Parse user data
    const userData: UserData = {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatarHash: rawData.avatar,
        bot: Boolean(rawData.bot),
        system: Boolean(rawData.system),
        publicFlags: rawData.public_flags || 0,
        fetchedAt: Date.now()
    };

    // Update cached user
    User._updateObjectFromData(client, userData);

    // Return
    return userData;
}