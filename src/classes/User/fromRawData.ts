import { Client, RawUserData, User, UserData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawUserData): User {

    // Get user from cache
    let user: User | undefined = client.users.get(rawData.id);

    // Parse user data
    const userData: UserData = {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatar: rawData.avatar || undefined,
        bot: rawData.bot,
        system: rawData.system,
        publicFlags: rawData.public_flags || 0
    };

    // Update user object
    if (user) User._updateObject(user, userData);

    // Create user
    else user = new User(client, userData);

    // Return
    return user;
}