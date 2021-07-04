import { Base, CacheInterface } from "../../internal";

export type GetFetch<FetchObject, Fetch> = FetchObject extends true ? Fetch : never;

export type GetResult<CachedObject, Fetch> = Fetch extends true ? Promise<CachedObject | undefined> : (CachedObject | undefined);

export default function get<CachedObject extends Base<CachedObject>, FetchObject, Fetch extends boolean = false>(cacheInterface: CacheInterface<CachedObject, FetchObject>, id: string, fetch?: GetFetch<FetchObject, Fetch>): GetResult<CachedObject, Fetch> {

    // Start by checking the cache for the object
    const object: CachedObject | undefined = cacheInterface._cacheManager._cache.get(id);

    // If the object was found or we don't need to fetch data from the API, return it
    if ((object) || (!fetch)) {

        // Check if the object is a valid match for the cache manager interface
        if ((object) && (cacheInterface._match) && (!cacheInterface._match(object as CachedObject))) return undefined as GetResult<CachedObject, Fetch>;

        // Return
        return object as GetResult<CachedObject, Fetch>;
    }

    // Return promise
    return new Promise(async (resolve) => {

        // Fetch the object from the API
        const fetchedObject: CachedObject | undefined = await cacheInterface._fetchObject?.(id);

        // Check if the object is a valid match for the cache manager interface
        if ((!fetchedObject) || ((cacheInterface._match) && (!cacheInterface._match(fetchedObject)))) return resolve(undefined);

        // Resolve the promise with the object that was fetched
        resolve(fetchedObject);
    }) as GetResult<CachedObject, Fetch>;
}