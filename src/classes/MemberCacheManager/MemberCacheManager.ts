import { Base, CacheManager, CacheManagerData, Client } from "../../internal";

/**
 * Member Cache Manager
 *
 * Similar to a `CacheManager` except that it takes a `baseID` and a `userID` for inputs instead of just an `id`
 * Used to cache objects like members, thread members, and bans
 *
 * `MemberCacheManager` keeps an internal `CacheManager` (`MemberCacheManager._cacheManager`)
 * and uses the `baseID` and `userID` concatenated with an underscore (`${baseID}_${userID}`) as the `id` for the `CacheManager`
 */
export default class MemberCacheManager<CachedObject extends Base<CachedObject>> {

    /**
     * Client
     *
     * The client
     */
    get client(): Client {
        return this._cacheManager.client;
    }

    /**
     * Cache Manager
     *
     * The cache manager
     *
     * @private
     */
    _cacheManager: CacheManager<CachedObject>;

    /**
     * Size
     *
     * The size of the cache
     */
    get size(): number {
        return this._cacheManager.size;
    }

    /**
     * Cache Deleted For
     *
     * The amount of time in milliseconds to keep the object cached after its been deleted
     * `undefined` if the object should never expire from cache
     */
    get cacheDeletedFor(): number | undefined {
        return this._cacheManager.cacheDeletedFor;
    }

    /**
     * Cache For
     *
     * The amount of time in milliseconds to keep objects cached
     * `undefined` if objects should never expire from cache
     */
    get cacheFor(): number | undefined {
        return this._cacheManager.cacheFor;
    }

    /**
     * Garbage Collection Interval
     *
     * The interval in milliseconds for garbage collecting cached objects
     * `undefined` if objects should never be garbage collected
     */
    get garbageCollectionInterval(): number | undefined {
        return this._cacheManager.garbageCollectionInterval;
    }

    /**
     * Cache All
     *
     * Whether or not to cache all objects
     */
    get cacheAll(): boolean {
        return this._cacheManager.cacheAll;
    }

    /**
     * Member Cache Manager
     *
     * @param client The client
     * @param cacheManagerData Options to initialize this cache manager with
     * @param cacheManagerData.cacheFor The amount of time in milliseconds to keep objects cached
     * @param cacheManagerData.cacheDeletedFor The amount of time in milliseconds to keep the object cached after its been deleted
     * @param cacheManagerData.garbageCollectionInterval The interval in milliseconds for garbage collecting cached objects
     * @param cacheManagerData.cacheAll Whether or not to cache all objects
     */
    constructor(client: Client, cacheManagerData: CacheManagerData) {

        // Create cache manager
        this._cacheManager = new CacheManager<CachedObject>(client, cacheManagerData);
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param baseID The ID of the object's base
     * @param userID The ID of the object's user
     *
     * @returns {CachedObject | undefined} The object or `undefined` if it doesn't exist
     */
    get(baseID: string, userID: string): CachedObject | undefined {
        return this._cacheManager.get(`${baseID}_${userID}`);
    }

    /**
     * Get Items
     *
     * Get all the objects from cache
     *
     * @returns {Map<string, CachedObject>} The objects
     */
    getItems(): Map<string, CachedObject> {
        return this._cacheManager.getItems();
    }

    /**
     * Cache
     *
     * Cache an object
     *
     * @param baseID The ID of the object's base
     * @param userID The ID of the object's user
     * @param object The object
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(baseID: string, userID: string, object: CachedObject, expiresIn?: number | null) {
        this._cacheManager.cache(`${baseID}_${userID}`, object, expiresIn);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param baseID The ID of the object's base
     * @param userID The ID of the object's user
     */
    uncache(baseID: string, userID: string) {
        this._cacheManager.uncache(`${baseID}_${userID}`);
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
        return this._cacheManager.filter(predicate, modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        this._cacheManager.clear();
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the cached objects
     */
    garbageCollect() {
        this._cacheManager.garbageCollect();
    }
}