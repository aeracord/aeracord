import { CacheManager, Client } from "../../internal";
import markAsDeleted from "./markAsDeleted";
import unmarkAsDeleted from "./unmarkAsDeleted";

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
     * Deleted
     *
     * Whether or not the object is deleted
     */
    deleted?: boolean;

    /**
     * Cache Manager
     *
     * The cache manager for the object that extends this `Base`
     */
    cacheManager: CacheManager<ObjectType>;
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
     * Deleted
     *
     * Whether or not the object is deleted
     */
    deleted: boolean;

    /**
     * Cache Manager
     *
     * The cache manager for the object that extends this `Base`
     *
     * @private
     */
    _cacheManager: CacheManager<ObjectType>;

    /**
     * Expires From Cache At
     *
     * The timestamp for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` if the object isnt cached
     */
    expiresFromCacheAt?: number | null;

    /**
     * Last Updated At
     *
     * The timestamp for when this object was last updated at
     *
     * @private
     */
    _lastUpdatedAt: number;

    /**
     * Base
     *
     * @param client The client
     * @param baseData Options to initialize this base with
     * @param baseData.id The ID of the object
     * @param baseData.cacheManager The cache manager for the object that extends this `Base`
     */
    constructor(client: Client, baseData: BaseData<ObjectType>) {

        // Set data
        this.client = client;
        this.id = baseData.id;
        this.deleted = Boolean(baseData.deleted);
        this._cacheManager = baseData.cacheManager;
        this._lastUpdatedAt = 0;
    }

    /**
     * Expire From Cache In
     *
     * Set the amount of time in milliseconds to keep this object cached
     *
     * @param amount The amount of time
     * `null` if the object should never expire from cache
     * `undefined` if the object isnt cached
     */
    expireFromCacheIn(amount?: number | null) {
        this.expiresFromCacheAt = typeof amount === "number" ? Date.now() + amount : amount;
    }

    /**
     * Mark as Delete
     *
     * Mark this object as deleted
     *
     * @private
     */
    _markAsDeleted() {
        markAsDeleted<ObjectType>(this);
    }

    /**
     * Unmark as Delete
     *
     * Unmark this object as deleted
     *
     * @private
     */
    _unmarkAsDeleted() {
        unmarkAsDeleted<ObjectType>(this);
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