import { Base, CacheStrategy, Client, ParsedCacheStrategy } from "../../internal";
import filter from "./filter";
import parseCacheStrategy from "./parseCacheStrategy";

export interface CacheManagerData {
    cacheFor?: number;
    garbageCollectionInterval?: number;
}

/**
 * Cache Manager
 *
 * `Client`s have `CacheManager`s as a central way to access cached data
 * Each `CacheManager` has a type of object it caches (`CachedObject`)
 * For example, `Client.guilds` has a `CacheManager<Guild>`
 *
 * Note that other class properties such as `Guild.channels` use `CacheManagerInterfaces`
 */
export default class CacheManager<CachedObject extends Base<CachedObject>> {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Cache
     *
     * The cache
     */
    _cache: Map<string, CachedObject>;

    /**
     * Cache For
     *
     * The amount of time in milliseconds to keep objects cached
     * `undefined` if objects should never expire from cache
     */
    cacheFor?: number;

    /**
     * Garbage Collection Interval
     *
     * The interval in milliseconds for garbage collecting cached objects
     * `undefined` if objects should never be garbage collected
     */
    garbageCollectionInterval?: number;

    /**
     * Cache Manager
     *
     * @param client The client
     * @param cacheManagerData Options to initialize this cache manager with
     * @param cacheManagerData.cacheFor The amount of time in milliseconds to keep objects cached
     * @param cacheManagerData.garbageCollectionInterval The interval in milliseconds for garbage collecting cached objects
     */
    constructor(client: Client, cacheManagerData: CacheManagerData) {

        // Set data
        this.client = client;
        this._cache = new Map();
        this.cacheFor = cacheManagerData.cacheFor;
        this.garbageCollectionInterval = cacheManagerData.garbageCollectionInterval;

        // Set garbage collection interval
        if (this.garbageCollectionInterval) setInterval(() => this.garbageCollect(), this.garbageCollectionInterval);
    }

    /**
     * Parse Cache Strategy
     *
     * Create a `ParsedCacheStrategy` object from a `CacheStrategy` object
     *
     * @param cacheStrategy The cache strategy
     *
     * @returns {ParsedCacheStrategy} The parsed cache strategy
     */
    static parseCacheStrategy(cacheStrategy?: CacheStrategy): ParsedCacheStrategy {
        return parseCacheStrategy(cacheStrategy);
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param id The ID of the object
     *
     * @returns {CachedObject | undefined} The object or `undefined` if it doesn't exist
     */
    get(id: string): CachedObject | undefined {
        return this._cache.get(id);
    }

    /**
     * Cache
     *
     * Cache an object
     *
     * @param id The ID of the object
     * @param object The object
     */
    cache(id: string, object: CachedObject) {
        this._cache.set(id, object);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param id The ID of the object
     */
    uncache(id: string) {
        this._cache.delete(id);
    }

    /**
     * Filter
     *
     * Filter the cache
     *
     * @param predicate The function to filter the cache
     * @param modify Modify the cache to meet the filter's requirements
     *
     * @returns {Map<string, CachedObject>} The filtered cache
     */
    filter(predicate: (value: CachedObject, index: number) => any, modify?: boolean): Map<string, CachedObject> {
        return filter<CachedObject>(this, predicate, modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        this._cache.clear();
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the cached objects
     */
    garbageCollect() {
        this.filter((value: CachedObject) => !value.expiresFromCacheAt || (value.expiresFromCacheAt > Date.now()), true);
    }
}