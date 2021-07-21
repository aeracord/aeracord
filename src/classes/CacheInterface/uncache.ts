import { Base, CacheInterface } from "../../internal";

export default function uncache<CachedObject extends Base<CachedObject>, FetchObject>(cacheInterface: CacheInterface<CachedObject, FetchObject>, id: string) {

    // Get the object from cache
    const object: CachedObject | undefined = cacheInterface._cacheManager.get(id);

    // If the object isnt cached we dont need to do anything
    if (!object) return;

    // Check if the object is a valid match for the cache interface
    if ((cacheInterface._match) && (!cacheInterface._match(object))) return;

    // Uncache the object
    cacheInterface._cacheManager.uncache(id);
}