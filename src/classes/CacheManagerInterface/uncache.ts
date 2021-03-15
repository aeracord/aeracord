import { CacheManagerInterface } from "../../internal";

export default function uncache<CachedObject>(cacheManagerInterface: CacheManagerInterface<CachedObject>, id: string) {

    // Get the object from cache
    const object: CachedObject | undefined = cacheManagerInterface._cacheManager.get(id);

    // If the object isnt cached we dont need to do anything
    if (!object) return;

    // Check if the object is a valid match for the cache manager interface
    if ((cacheManagerInterface._match) && (!cacheManagerInterface._match(object))) return;

    // Uncache the object
    cacheManagerInterface._cacheManager.uncache(id);
}