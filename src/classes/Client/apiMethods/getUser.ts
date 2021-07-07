import { APIError, Client, FetchQueue, RawUserData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getUser(client: Client, userResolvable: UserResolvable): Promise<User | undefined> {

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
    let unknownUser: boolean = false;
    const result: RawUserData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown user
        if ((err.code === 10013) || (err.errors?.user_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE")) unknownUser = true;

        // Throw error
        else throw err;
    });

    // Unknown user
    if (unknownUser) return;

    // Parse user
    const user: User = User._fromRawData(client, result);

    // Return
    return user;
}