import { Client, FetchQueue, RawUserData, User, UserData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getCurrentUser(client: Client): Promise<UserData> {

    // Define fetch data
    const path: string = "/users/@me";
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