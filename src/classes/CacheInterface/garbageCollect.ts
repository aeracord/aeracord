import { Base, CacheInterface, MatchFunction } from "../../internal";

export default function garbageCollect<CachedObject extends Base<CachedObject>, FetchObject>(cacheInterface: CacheInterface<CachedObject, FetchObject>) {

    // If theres a match function, filter the cache
    if (cacheInterface._match) cacheInterface._cacheManager.filter((value: CachedObject) => (!(cacheInterface._match as MatchFunction<CachedObject>)(value)) || (value.expiresFromCacheAt === null || ((typeof value.expiresFromCacheAt === "number") && (value.expiresFromCacheAt > Date.now()))), true);

    // Otherwise, garbage collect all objects
    else cacheInterface._cacheManager.garbageCollect();
}