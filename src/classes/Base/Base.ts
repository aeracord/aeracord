import { CacheManager, Client } from "../../internal";

/**
 * Base Data
 *
 * Data to create a `Base`
 */
export interface BaseData<ObjectType extends Base<ObjectType>> {

    /**
     * ID
     *
     * The ID of the object
     */
    id: string;

    /**
     * Cache Manager
     *
     * The cache manager for the object that extends this `Base`
     */
    cacheManager: CacheManager<ObjectType>;

    /**
     * Expires From Cache At
     *
     * The timestamp for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` if it should be based on `cacheManager.cacheFor`
     */
    expiresFromCacheAt?: number | null;
}

export default class Base<ObjectType extends Base<ObjectType>> {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The ID of the object
     */
    id: string;

    /**
     * Cache Manager
     *
     * The cache manager for the object that extends this `Base`
     */
    _cacheManager: CacheManager<ObjectType>;

    /**
     * Expires From Cache At
     *
     * The timestamp for when this object can be garbage collected
     * `undefined` if it should never expire from cache
     */
    expiresFromCacheAt?: number;

    /**
     * Base
     *
     * @param client The client
     * @param baseData Options to initialize this base with
     * @param baseData.id The ID of the object
     * @param baseData.cacheManager The cache manager for the object that extends this `Base`
     * @param baseData.expiresFromCacheAt The timestamp for when this object can be garbage collected
     */
    constructor(client: Client, baseData: BaseData<ObjectType>) {

        // Set data
        this.client = client;
        this.id = baseData.id;
        this._cacheManager = baseData.cacheManager;
        if (typeof baseData.expiresFromCacheAt === "number") this.expiresFromCacheAt = baseData.expiresFromCacheAt;
        else if ((baseData.expiresFromCacheAt === undefined) && (this._cacheManager.cacheFor !== undefined)) this.expiresFromCacheAt = Date.now() + this._cacheManager.cacheFor;
    }

    /**
     * Expire From Cache In
     *
     * Set the amount of time in milliseconds to keep this object cached
     *
     * @param amount The amount of time
     * `undefined` if it should never expire from cache
     */
    expireFromCacheIn(amount?: number) {
        this.expiresFromCacheAt = amount !== undefined ? Date.now() + amount : undefined;
    }

    /**
     * Uncache
     *
     * Remove this object from cache
     */
    uncache() {
        this._cacheManager.uncache(this.id);
    }
}