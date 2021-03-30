import { Client, User, UserData } from "../../internal";

export default function updateObjectFromData(client: Client, userData: UserData): User | undefined {

    // Get user from cache
    let user: User | undefined = client.users.get(userData.id);

    // Update user object
    if (user) User._updateObject(user, userData);

    // Return
    return user;
}