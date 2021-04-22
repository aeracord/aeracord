import { Base, CacheStrategyData, Client, ParsedCacheStrategy } from "../../internal";
import filter from "./filter";
import parseCacheStrategy from "./parseCacheStrategy";

/**
 * Cache Manager Data
 *
 * Data to create a `CacheManager`
 */
export interface CacheManagerData {

    /**
     * Cache For
     *
     * The amount of time in milliseconds to keep objects cached
     * `undefined` if objects should never expire from cache
     */
    cacheFor?: number;

    /**
     * Cache Deleted For
     *
     * The amount of time in milliseconds to keep the object cached after its been deleted
     * `undefined` if the object should never expire from cache
     */
    cacheDeletedFor?: number;

    /**
     * Garbage Collection Interval
     *
     * The interval in milliseconds for garbage collecting cached objects
     * `undefined` if objects should never be garbage collected
     */
    garbageCollectionInterval?: number;

    /**
     * Cache All
     *
     * Whether or not to cache all objects
     */
    cacheAll?: boolean;
}

/**
 * Cache Manager
 *
 * `Client`s have `CacheManager`s as a central way to access cached data
 * Each `CacheManager` has a type of object it caches (`CachedObject`)
 * For example, `Client.guilds` has a `CacheManager<Guild>`
 *
 * Note that other class properties such as `Guild.channels` use `CacheInterface`s
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
     *
     * @private
     */
    _cache: Map<string, CachedObject>;

    /**
     * Size
     *
     * The size of the cache
     */
    get size(): number {
        return this._cache.size;
    }

    /**
     * Cache For
     *
     * The amount of time in milliseconds to keep objects cached
     * `undefined` if objects should never expire from cache
     */
    cacheFor?: number;

    /**
     * Cache Deleted For
     *
     * The amount of time in milliseconds to keep the object cached after its been deleted
     * `undefined` if the object should never expire from cache
     */
    cacheDeletedFor?: number;

    /**
     * Garbage Collection Interval
     *
     * The interval in milliseconds for garbage collecting cached objects
     * `undefined` if objects should never be garbage collected
     */
    garbageCollectionInterval?: number;

    /**
     * Cache All
     *
     * Whether or not to cache all objects
     */
    cacheAll: boolean;

    /**
     * Cache Manager
     *
     * @param client The client
     * @param cacheManagerData Options to initialize this cache manager with
     * @param cacheManagerData.cacheFor The amount of time in milliseconds to keep objects cached
     * @param cacheManagerData.cacheDeletedFor The amount of time in milliseconds to keep the object cached after its been deleted
     * @param cacheManagerData.garbageCollectionInterval The interval in milliseconds for garbage collecting cached objects
     * @param cacheManagerData.cacheAll Whether or not to cache all objects
     */
    constructor(client: Client, cacheManagerData: CacheManagerData) {

        // Set data
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false
        });
        this._cache = new Map();
        this.cacheFor = cacheManagerData.cacheFor;
        this.cacheDeletedFor = cacheManagerData.cacheDeletedFor;
        this.garbageCollectionInterval = cacheManagerData.garbageCollectionInterval;
        this.cacheAll = Boolean(cacheManagerData.cacheAll);

        // Set garbage collection interval
        if (this.garbageCollectionInterval) setInterval(() => this.garbageCollect(), this.garbageCollectionInterval);
    }

    /**
     * Parse Cache Strategy
     *
     * Create a `ParsedCacheStrategy` object from a `CacheStrategy` object
     *
     * @param cacheStrategyData The cache strategy data
     *
     * @returns {ParsedCacheStrategy} The parsed cache strategy
     */
    static parseCacheStrategy(cacheStrategyData?: CacheStrategyData): ParsedCacheStrategy {
        return parseCacheStrategy(cacheStrategyData);
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
     * Get Items
     *
     * Get all the objects from cache
     *
     * @returns {Map<string, CachedObject>} The objects
     */
    getItems(): Map<string, CachedObject> {
        return new Map(this._cache);
    }

    /**
     * Cache
     *
     * Cache an object
     *
     * @param id The ID of the object
     * @param object The object
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(id: string, object: CachedObject, expiresIn?: number | null) {
        this._cache.set(id, object);
        object.expireFromCacheIn(expiresIn === undefined ? (this.cacheFor || null) : expiresIn);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param id The ID of the object
     */
    uncache(id: string) {
        const object: CachedObject | undefined = this.get(id);
        this._cache.delete(id);
        if (object) object.expireFromCacheIn();
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
        this.filter((value: CachedObject) => value.expiresFromCacheAt === null || ((typeof value.expiresFromCacheAt === "number") && (value.expiresFromCacheAt > Date.now())), true);
    }
}