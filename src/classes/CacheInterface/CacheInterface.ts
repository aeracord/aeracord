import { Base, CacheManager, Client } from "../../internal";
import clear from "./clear";
import garbageCollect from "./garbageCollect";
import get, { GetFetch, GetResult } from "./get";
import getItems from "./getItems";
import uncache from "./uncache";

/**
 * Cache Interface Data
 *
 * Data to create a `CacheInterface`
 */
export interface CacheInterfaceData<CachedObject extends Base<CachedObject>> {

    /**
     * Cache Manager
     *
     * The cache manager
     */
    cacheManager: CacheManager<CachedObject>;

    /**
     * Match
     *
     * The function to use to check if an object is a valid match for the cache interface
     */
    match?: MatchFunction<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to fetch an object from the API
     */
    fetchObject?: (id: string) => Promise<CachedObject | undefined>;

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
 * A function used to check if an object is a valid match for the cache interface
 */
export type MatchFunction<CachedObject> = (object: CachedObject) => boolean;

/**
 * Cache Interface
 *
 * Class properties use `CacheInterface`s as a way to access cached data related to the class
 * Each `CacheInterface` has a type of object it caches (`CachedObject`)
 * For example, `Guild.channels` has a `CacheInterface<AnyChannel>`
 *
 * Note that the `Client` uses `CacheManager`s as a central location for cached data
 */
export default class CacheInterface<CachedObject extends Base<CachedObject>, FetchObject = true> {

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
        return this._match ? this.getItems().size : this._cacheManager.size;
    }

    /**
     * Match
     *
     * The function to use to check if an object is a valid match for the cache interface
     *
     * For example, with a `CacheInterface<AnyChannel>` on `Guild.channels`, `CacheInterface.get()` would check `Client.channels` for the `id`
     * This could potentially return a channel that isnt in the right guild
     * The `match` function is what should be used to ensure that the channel is from the right guild
     *
     * @private
     */
    _match?: MatchFunction<CachedObject>;

    /**
     * Fetch Object
     *
     * A function to fetch an object from the API
     *
     * @private
     */
    _fetchObject?: (id: string) => Promise<CachedObject | undefined>;

    /**
     * Fetch Object
     *
     * A function to get the IDs of objects that could be in cache
     * For example, `CacheInterface<Role>` could get IDs from `Guild.roleData`
     *
     * @private
     */
    _getIDs?: () => string[];

    /**
     * Cache Interface
     *
     * @param client The client
     * @param cacheInterfaceData Options to initialize this cache interface with
     * @param cacheInterfaceData.cacheManager The cache manager
     * @param cacheInterfaceData.match The function to use to check if an object is a valid match for the cache interface
     * @param cacheInterfaceData.fetchObject A function to fetch an object from the API
     * @param cacheInterfaceData.getIDs A function to get the IDs of objects that could be in cache
     */
    constructor(client: Client, cacheInterfaceData: CacheInterfaceData<CachedObject>) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this._cacheManager = cacheInterfaceData.cacheManager;
        this._match = cacheInterfaceData.match;
        this._fetchObject = cacheInterfaceData.fetchObject;
        this._getIDs = cacheInterfaceData.getIDs;
    }

    /**
     * Get
     *
     * Get an object from cache
     *
     * @param id The ID of the object
     * @param fetch Whether or not to fetch this object from the API if it isn't cached
     *
     * @returns {CachedObject | Promise<CachedObject> | undefined} The object or `undefined` if it doesn't exist
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