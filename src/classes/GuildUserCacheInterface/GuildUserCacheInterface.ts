import { Base, CacheInterface, CacheInterfaceData, Client } from "../../internal";
import { GetFetch, GetResult } from "../CacheInterface/get";

/**
 * Guild User Cache Manager Interface
 *
 * Similar to a `CacheInterface` except that it takes a `guildID` and a `userID` for inputs instead of just an `id`
 * Used to cache objects like `Member`s and `Ban`s
 *
 * `GuildUserCacheInterface` keeps an internal `CacheInterface` (`GuildUserCacheInterface._cacheInterface`)
 * and uses the `guildID` and `userID` concatenated with an underscore (`${guildID}_${userID}`) as the `id` for the `CacheInterface`
 */
export default class GuildUserCacheInterface<CachedObject extends Base<CachedObject>, FetchObject = true> {

    /**
     * Client
     *
     * The client
     */
    get client(): Client {
        return this._cacheInterface.client;
    }

    /**
     * Cache Manager Interface
     *
     * The cache manager interface
     */
    _cacheInterface: CacheInterface<CachedObject, FetchObject>;

    /**
     * Size
     *
     * The size of the cache
     */
    get size(): number {
        return this._cacheInterface.size;
    }

    /**
     * Guild User Cache Manager Interface
     *
     * @param client The client
     * @param cacheInterfaceData Options to initialize this cache manager interface with
     * @param cacheInterfaceData.cacheManager The cache manager
     * @param cacheInterfaceData.match The function to use to check if an object is a valid match for the cache manager interface
     * @param cacheInterfaceData.fetchObject A function to fetch an object from the API
     */
    constructor(client: Client, cacheInterfaceData: CacheInterfaceData<CachedObject>) {

        // Create cache manager interface
        this._cacheInterface = new CacheInterface<CachedObject, FetchObject>(client, cacheInterfaceData);
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param guildID The ID of the object's guild
     * @param userID The ID of the object's user
     * @param fetch Whether or not to fetch this object from the API if it isn't cached
     *
     * @returns {CachedObject | Promise<CachedObject> | undefined} The cached object or `undefined` if it doesn't exist
     */
    get<Fetch extends boolean = false>(guildID: string, userID: string, fetch?: GetFetch<FetchObject, Fetch>): GetResult<CachedObject, Fetch> {
        return this._cacheInterface.get(`${guildID}_${userID}`, fetch);
    }

    /**
     * Get Items
     *
     * Get all the objects from cache
     *
     * @returns {Map<string, CachedObject>} The objects
     */
    getItems(): Map<string, CachedObject> {
        return this._cacheInterface.getItems();
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
        this._cacheInterface.uncache(`${guildID}_${userID}`);
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
        return this._cacheInterface.filter(predicate, modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        this._cacheInterface.clear();
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the cached objects
     */
    garbageCollect() {
        this._cacheInterface.garbageCollect();
    }
}