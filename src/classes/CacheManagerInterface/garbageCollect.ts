import { Base, CacheManagerInterface, MatchFunction } from "../../internal";

export default function garbageCollect<CachedObject extends Base<CachedObject>>(cacheManagerInterface: CacheManagerInterface<CachedObject>) {

    // If theres a match function, filter the cache
    if (cacheManagerInterface._match) cacheManagerInterface._cacheManager.filter((value: CachedObject) => (!(cacheManagerInterface._match as MatchFunction<CachedObject>)(value)) || (!value.expiresFromCacheAt || (value.expiresFromCacheAt > Date.now())), true);

    // Otherwise, garbage collect all objects
    else cacheManagerInterface._cacheManager.garbageCollect();
}