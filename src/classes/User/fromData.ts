import { Client, User, UserData } from "../../internal";

export default function fromData(client: Client, userData: UserData): User {

    // Update cached user
    let user: User | undefined = User._updateObjectFromData(client, userData);

    // Create user
    if (!user) user = new User(client, userData);

    // Return
    return user;
}