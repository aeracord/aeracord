/**
 * Cache Strategies
 *
 * How the client should cache objects
 */
export interface CacheStrategies {
    bans?: CacheStrategy<InitialCacheTypeGuilds>;
    channels?: CacheStrategy<InitialCacheTypeGuilds>;
    emojis?: CacheStrategy<InitialCacheTypeGuilds>;
    guilds?: CacheStrategy<InitialCacheTypeIDs>;
    guildWidgets?: CacheStrategy<InitialCacheTypeIDs>;
    interactions?: CacheStrategy<undefined>;
    invites?: CacheStrategy<InitialCacheTypeChannels>;
    members?: CacheStrategy<InitialCacheTypeGuilds>;
    messages?: CacheStrategy<InitialCacheTypeMessages>;
    presences?: CacheStrategy<InitialCacheTypeIDs>;
    roles?: CacheStrategy<InitialCacheTypeGuilds>;
    stickers?: CacheStrategy<InitialCacheTypeGuilds>;
    templates?: CacheStrategy<InitialCacheTypeGuilds>;
    threads?: CacheStrategy<InitialCacheTypeChannels, true>;
    threadMembers?: CacheStrategy<undefined>;
    vanityInvites?: CacheStrategy<InitialCacheTypeIDs>;
    webhooks?: CacheStrategy<InitialCacheTypeChannels>;
    welcomeScreens?: CacheStrategy<InitialCacheTypeIDs>;
    users?: CacheStrategy<InitialCacheTypeIDs>;
}

/**
 * Cache Strategy
 *
 * How something should be cached
 */
export interface CacheStrategy<CacheStrategyInitialCacheType extends (InitialCacheType | undefined), Archivable extends boolean = false> {

    /**
     * Cache For
     *
     * The amount of time in milliseconds to keep the object cached
     * `null` if the object should never expire from cache
     */
    cacheFor?: number | null;

    /**
     * Cache Deleted For
     *
     * The amount of time in milliseconds to keep the object cached after its been deleted
     * `null` if the object should never expire from cache
     */
    cacheDeletedFor?: number | null;

    /**
     * Cache Archived For
     *
     * The amount of time in milliseconds to keep the object cached after its been archived
     * `null` if the object should never expire from cache
     */
    cacheArchivedFor?: Archivable extends true ? (number | null) : undefined;

    /**
     * Garbage Collection Interval
     *
     * The interval in milliseconds for garbage collecting cached objects
     * `null` if the objects should never be garbage collected
     */
    garbageCollectionInterval?: number | null;

    /**
     * Cache All
     *
     * Whether or not to cache all objects
     */
    cacheAll?: boolean;

    /**
     * Initial Cache
     *
     * The objects that should be cached when the client connects to the gateway
     * `true` if all objects should be cached
     */
    initialCache?: CacheStrategyInitialCacheType extends undefined ? undefined : (CacheStrategyInitialCacheType | boolean);
}

/**
 * Initial Cache Type
 *
 * Types of initial caches
 */
export type InitialCacheType = InitialCacheTypeIDs | InitialCacheTypeGuilds | InitialCacheTypeChannels | InitialCacheTypeMessages;

/**
 * Initial Cache Type: IDs
 *
 * An array of IDs to cache
 */
export type InitialCacheTypeIDs = string[];

/**
 * Initial Cache Type: Guilds
 *
 * Used to cache objects with specific IDs and objects from specific guilds
 */
export interface InitialCacheTypeGuilds {

    /**
     * IDs
     *
     * The IDs of the objects to cache
     */
    ids?: string[];

    /**
     * Guilds
     *
     * The IDs of the guilds to cache objects from
     */
    guilds?: string[];
}

/**
 * Initial Cache Type: Channels
 *
 * Used to cache objects with specific IDs, objects from specific guilds, and objects from specific channels
 */
export interface InitialCacheTypeChannels {

    /**
     * IDs
     *
     * The IDs of the objects to cache
     */
    ids?: string[];

    /**
     * Channels
     *
     * The IDs of the channels to cache objects from
     */
    channels?: string[];

    /**
     * Guilds
     *
     * The IDs of the guilds to cache objects from
     */
    guilds?: string[];
}

/**
 * Initial Cache Type: Messages
 *
 * Used to cache messages with specific IDs, messages from specific guilds, and messages from specific channels
 * Also allows specifying how many messages to fetch from channels
 */
export interface InitialCacheTypeMessages extends InitialCacheTypeChannels {

    /**
     * Count
     *
     * The amount of messages to fetch from channels
     */
    count?: number;
}