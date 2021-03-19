import { Client, User, UserData } from "../../internal";

export default function fromData(client: Client, userData: UserData): User {

    // Get user from cache
    let user: User | undefined = client.users.get(userData.id);

    // Update user object
    if (user) User._updateObject(user, userData);

    // Create user
    else user = new User(client, userData);

    // Return
    return user;
}