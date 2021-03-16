import { Client, FetchQueue, RawUserData, User, UserData, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getUser(client: Client, userResolvable: UserResolvable): Promise<UserData> {

    // Resolve objects
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

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

    // Parse user data
    const userData: UserData = User._fromRawData(result);

    // Return
    return userData;
}