import { Client, FetchQueue, RawUserData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getUser(client: Client, userResolvable: UserResolvable): Promise<User> {

    // Resolve objects
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/users/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawUserData = await fetchQueue.request({
        path,
        method
    });

    // Parse user
    const user: User = User._fromRawData(client, result);

    // Return
    return user;
}