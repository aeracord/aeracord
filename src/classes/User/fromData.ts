import { Client, User, UserData } from "../../internal";

export default function fromData(client: Client, userData: UserData): User {

    // Get user from cache
    let user: User | undefined = client.users.get(userData.id);

    // Create user
    if (!user) user = new User(client, userData);

    // Return
    return user;
}