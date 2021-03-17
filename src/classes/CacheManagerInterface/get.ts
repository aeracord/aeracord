import { Base, CacheManagerInterface } from "../../internal";

export type GetResult<CachedObject, Fetch> = Fetch extends true ? Promise<CachedObject | undefined> : (CachedObject | undefined);

export default function get<CachedObject extends Base<CachedObject>, Fetch extends boolean = false>(cacheManagerInterface: CacheManagerInterface<CachedObject>, id: string, fetch?: Fetch): GetResult<CachedObject, Fetch> {

    // Start by checking the cache for the object
    const object: CachedObject | Promise<CachedObject> | undefined = cacheManagerInterface._cacheManager.get(id, fetch);

    // If the object was already cached or we don't need to fetch data from the API
    if (((object) && (!(object instanceof Promise))) || (!fetch)) {

        // Check if the object is a valid match for the cache manager interface
        if ((object) && (cacheManagerInterface._match) && (!cacheManagerInterface._match(object as CachedObject))) return undefined as GetResult<CachedObject, Fetch>;

        // Return
        return object as GetResult<CachedObject, Fetch>;
    }

    // Return promise
    return new Promise(async (resolve) => {

        // Fetch the object from the API
        const fetchedObject: CachedObject = await (object as Promise<CachedObject>);

        // Check if the object is a valid match for the cache manager interface
        if ((cacheManagerInterface._match) && (!cacheManagerInterface._match(fetchedObject))) return resolve(undefined);

        // Resolve the promise with the object that was fetched
        resolve(fetchedObject);
    }) as GetResult<CachedObject, Fetch>;
}