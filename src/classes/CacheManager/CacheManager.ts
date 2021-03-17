import { Client, GetResult } from "../../internal";
import filter from "./filter";
import get from "./get";

export interface CacheManagerData<CachedObject> {
    cacheFor?: number;
    garbageCollectionInterval?: number;
    fetchObject: (id: string) => Promise<CachedObject>;
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
export default class CacheManager<CachedObject> {

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
     * Fetch Object
     *
     * A function to fetch an object from the API
     */
    fetchObject: (id: string) => Promise<CachedObject>;

    /**
     * Cache Manager
     *
     * @param client The client
     * @param cacheManagerData Options to initialize this cache manager with
     * @param cacheManagerData.cacheFor The amount of time in milliseconds to keep objects cached
     * @param cacheManagerData.garbageCollectionInterval The interval in milliseconds for garbage collecting cached objects
     * @param cacheManagerData.fetchObject A function to fetch an object from the API
     */
    constructor(client: Client, cacheManagerData: CacheManagerData<CachedObject>) {

        // Set data
        this.client = client;
        this._cache = new Map();
        this.cacheFor = cacheManagerData.cacheFor;
        this.garbageCollectionInterval = cacheManagerData.garbageCollectionInterval;
        this.fetchObject = cacheManagerData.fetchObject;
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param id The ID of the object
     * @param fetch Whether or not to fetch this object from the API if it isn't cached
     *
     * @returns {CachedObject | Promise<CachedObject> | undefined} The cached object or `undefined` if it doesn't exist
     */
    get<Fetch extends boolean = false>(id: string, fetch?: Fetch): GetResult<CachedObject, Fetch> {
        return get<CachedObject, Fetch>(this, id, fetch);
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
}