import { Base, CacheManager, CacheManagerData, Client } from "../../internal";

/**
 * Guild User Cache Manager
 *
 * Similar to a `CacheManager` except that it takes a `guildID` and a `userID` for inputs instead of just an `id`
 * Used to cache objects like `Member`s and `Ban`s
 *
 * `GuildUserCacheManager` keeps an internal `CacheManager` (`GuildUserCacheManager._cacheManager`)
 * and uses the `guildID` and `userID` concatenated with an underscore (`${guildID}_${userID}`) as the `id` for the `CacheManager`
 */
export default class GuildUserCacheManager<CachedObject extends Base<CachedObject>> {

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
     * Guild User Cache Manager
     *
     * @param client The client
     * @param cacheManagerData Options to initialize this cache manager with
     * @param cacheManagerData.cacheFor The amount of time in milliseconds to keep objects cached
     * @param cacheManagerData.garbageCollectionInterval The interval in milliseconds for garbage collecting cached objects
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
     * @param guildID The ID of the object's guild
     * @param userID The ID of the object's user
     *
     * @returns {CachedObject | undefined} The object or `undefined` if it doesn't exist
     */
    get(guildID: string, userID: string): CachedObject | undefined {
        return this._cacheManager.get(`${guildID}_${userID}`);
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
     * @param guildID The ID of the object's guild
     * @param userID The ID of the object's user
     * @param object The object
     */
    cache(guildID: string, userID: string, object: CachedObject) {
        this._cacheManager.cache(`${guildID}_${userID}`, object);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param guildID The ID of the object's guild
     * @param userID The ID of the object's user
     */
    uncache(guildID: string, userID: string) {
        this._cacheManager.uncache(`${guildID}_${userID}`);
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