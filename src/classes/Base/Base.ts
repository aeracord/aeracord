import { CacheManager, Client } from "../../internal";

export interface BaseData<ObjectType> {
    id: string;
    cacheManager: CacheManager<ObjectType>;
}

export default class Base<ObjectType> {

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
     * Cached
     *
     * Whether or not this object is cached
     */
    get cached(): boolean {
        return Boolean(this._cacheManager.get(this.id));
    }

    /**
     * Base
     *
     * @param client The client
     * @param baseData Options to initialize this base with
     * @param baseData.id The ID of the object
     */
    constructor(client: Client, baseData: BaseData<ObjectType>) {

        // Set data
        this.client = client;
        this.id = baseData.id;
        this._cacheManager = baseData.cacheManager;
    }

    /**
     * Cache
     *
     * Cache this object
     */
    cache() {
        this._cacheManager.cache.set(this.id, this as unknown as ObjectType);
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