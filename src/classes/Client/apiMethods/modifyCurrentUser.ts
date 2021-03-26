import { Client, FetchQueue, RawUserData, User, UserData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyCurrentUserData {
    username?: string;
    avatar?: string | null;
}

export default async function modifyCurrentUser(client: Client, modifyCurrentUserData: ModifyCurrentUserData): Promise<UserData> {

    // Define fetch data
    const path: string = "/users/@me";
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawUserData = await fetchQueue.request({
        path,
        method,
        data: {
            username: modifyCurrentUserData.username,
            avatar: modifyCurrentUserData.avatar
        }
    });

    // Parse user data
    const userData: UserData = User._fromRawData(client, result);

    // Return
    return userData;
}