import { CacheManager } from "../../internal";

export type GetResult<CachedObject, Fetch> = Fetch extends true ? Promise<CachedObject> : (CachedObject | undefined);

export default function get<CachedObject, Fetch extends boolean = false>(cacheManager: CacheManager<CachedObject>, id: string, fetch?: Fetch): GetResult<CachedObject, Fetch> {

    // Start by checking the cache for the object
    const object: CachedObject | undefined = cacheManager.cache.get(id);

    // If the object was found or we don't need to fetch data from the API, return it
    if ((object) || (!fetch)) return object as GetResult<CachedObject, Fetch>;

    // Fetch the object from the API and return it
    return cacheManager.fetchObject(id) as GetResult<CachedObject, Fetch>;
}