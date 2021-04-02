import { Base, CacheManager, Client } from "../../internal";
import clear from "./clear";
import garbageCollect from "./garbageCollect";
import get, { GetFetch, GetResult } from "./get";
import getItems from "./getItems";
import uncache from "./uncache";

/**
 * Cache Manager Interface Data
 *
 * Data to create a `CacheManagerInterface`
 */
export interface CacheManagerInterfaceData<CachedObject extends Base<CachedObject>> {

    /**
     * Cache Manager
     *
     * The cache manager
     */
    cacheManager: CacheManager<CachedObject>;

    /**
     * Match
     *
     * The function to use to check if an object is a valid match for the cache manager interface
     */
    match?: MatchFunction<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to fetch an object from the API
     */
    fetchObject?: (id: string) => Promise<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to get the IDs of objects that could be in cache
     */
    getIDs?: () => string[];
}

/**
 * Match Function
 *
 * A function used to check if an object is a valid match for the cache manager interface
 */
export type MatchFunction<CachedObject> = (object: CachedObject) => boolean;

/**
 * Cache Manager Interface
 *
 * Class properties use `CacheManagerInterface`s as a way to access cached data related to the class
 * Each `CacheManagerInterface` has a type of object it caches (`CachedObject`)
 * For example, `Guild.channels` has a `CacheManagerInterface<AnyChannel>`
 *
 * Note that the `Client` uses `CacheManager`s as a central location for cached data
 */
export default class CacheManagerInterface<CachedObject extends Base<CachedObject>, FetchObject = true> {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
        return this._match ? this.getItems().size : this._cacheManager.size;
    }

    /**
     * Match
     *
     * The function to use to check if an object is a valid match for the cache manager interface
     *
     * For example, with a `CacheManagerInterface<AnyChannel>` on `Guild.channels`, `CacheManagerInterface.get()` would check `Client.channels` for the `id`
     * This could potentially return a channel that isnt in the right guild
     * The `match` function is what should be used to ensure that the channel is from the right guild
     */
    _match?: MatchFunction<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to fetch an object from the API
     */
    _fetchObject?: (id: string) => Promise<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to get the IDs of objects that could be in cache
     * For example, `CacheManagerInterface<Role>` could get IDs from `Guild.roleData`
     */
    _getIDs?: () => string[];

    /**
     * Cache Manager Interface
     *
     * @param client The client
     * @param cacheManagerInterfaceData Options to initialize this cache manager interface with
     * @param cacheManagerInterfaceData.cacheManager The cache manager
     * @param cacheManagerInterfaceData.match The function to use to check if an object is a valid match for the cache manager interface
     * @param cacheManagerInterfaceData.fetchObject A function to fetch an object from the API
     * @param cacheManagerInterfaceData.getIDs A function to get the IDs of objects that could be in cache
     */
    constructor(client: Client, cacheManagerInterfaceData: CacheManagerInterfaceData<CachedObject>) {

        // Set data
        this.client = client;
        this._cacheManager = cacheManagerInterfaceData.cacheManager;
        this._match = cacheManagerInterfaceData.match;
        this._fetchObject = cacheManagerInterfaceData.fetchObject;
        this._getIDs = cacheManagerInterfaceData.getIDs;
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
    get<Fetch extends boolean = false>(id: string, fetch?: GetFetch<FetchObject, Fetch>): GetResult<CachedObject, Fetch> {
        return get<CachedObject, FetchObject, Fetch>(this, id, fetch);
    }

    /**
     * Get Items
     *
     * Get all the objects from cache
     *
     * @returns {Map<string, CachedObject>} The objects
     */
    getItems(): Map<string, CachedObject> {
        return getItems<CachedObject, FetchObject>(this);
    }

    /**
     * Uncache
     *
     * Remove an object from cache
     *
     * @param id The ID of the object
     */
    uncache(id: string) {
        uncache<CachedObject, FetchObject>(this, id);
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
        return this._cacheManager.filter((value: CachedObject, index: number) => this._match ? (this._match(value) && predicate(value, index)) : (predicate(value, index)), modify);
    }

    /**
     * Clear
     *
     * Clear the cache
     */
    clear() {
        clear<CachedObject, FetchObject>(this);
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the cached objects
     */
    garbageCollect() {
        garbageCollect<CachedObject, FetchObject>(this);
    }
}