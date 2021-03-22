import { Base, CacheManagerInterface, CacheManagerInterfaceData, Client } from "../../internal";
import { GetFetch, GetResult } from "../CacheManagerInterface/get";

/**
 * Guild User Cache Manager Interface
 *
 * Similar to a `CacheManagerInterface` except that it takes a `guildID` and a `userID` for inputs instead of just an `id`
 * Used to cache objects like `Member`s and `Ban`s
 *
 * `GuildUserCacheManagerInterface` keeps an internal `CacheManagerInterface` (`GuildUserCacheManagerInterface._cacheManagerInterface`)
 * and uses the `guildID` and `userID` concatenated with an underscore (`${guildID}_${userID}`) as the `id` for the `CacheManagerInterface`
 */
export default class GuildUserCacheManagerInterface<CachedObject extends Base<CachedObject>, FetchObject = true> {

    /**
     * Client
     *
     * The client
     */
    get client(): Client {
        return this._cacheManagerInterface.client;
    }

    /**
     * Cache Manager Interface
     *
     * The cache manager interface
     */
    _cacheManagerInterface: CacheManagerInterface<CachedObject, FetchObject>;

    /**
     * Guild User Cache Manager Interface
     *
     * @param client The client
     * @param cacheManagerInterfaceData Options to initialize this cache manager interface with
     * @param cacheManagerInterfaceData.cacheManager The cache manager
     * @param cacheManagerInterfaceData.match The function to use to check if an object is a valid match for the cache manager interface
     * @param cacheManagerInterfaceData.fetchObject A function to fetch an object from the API
     */
    constructor(client: Client, cacheManagerInterfaceData: CacheManagerInterfaceData<CachedObject>) {

        // Create cache manager interface
        this._cacheManagerInterface = new CacheManagerInterface<CachedObject, FetchObject>(client, cacheManagerInterfaceData);
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
        return this._cacheManagerInterface.get(`${guildID}_${userID}`, fetch);
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
        this._cacheManagerInterface.uncache(`${guildID}_${userID}`);
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
        return this._cacheManagerInterface.filter(predicate, modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        this._cacheManagerInterface.clear();
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the cached objects
     */
    garbageCollect() {
        this._cacheManagerInterface.garbageCollect();
    }
}