import { Base, CacheManagerInterface, MatchFunction } from "../../internal";

export default function clear<CachedObject extends Base<CachedObject>, FetchObject>(cacheManagerInterface: CacheManagerInterface<CachedObject, FetchObject>) {

    // If theres no match function, clear all objects
    if (!cacheManagerInterface._match) cacheManagerInterface._cacheManager.clear();

    // If theres a get IDs function, use it to clear objects
    else if (cacheManagerInterface._getIDs) {

        // Loop through IDs and uncache objects
        cacheManagerInterface._getIDs().forEach((id: string) => cacheManagerInterface._cacheManager.uncache(id));
    }

    // Otherwise, use the match function to filter the cache
    else cacheManagerInterface._cacheManager.filter((value: CachedObject) => !(cacheManagerInterface._match as MatchFunction<CachedObject>)(value), true);
}