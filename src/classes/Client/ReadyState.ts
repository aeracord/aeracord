/**
 * Ready State
 *
 * The client's ready states
 */
export type ReadyState = typeof ReadyStates.NONE | typeof ReadyStates.INITIAL_GUILDS | typeof ReadyStates.HOLDING_EVENTS | typeof ReadyStates.READY;
export const ReadyStates: {

    /**
     * None
     *
     * The ready state used when the client is connecting to the gateway
     */
    NONE: 0,

    /**
     * Initial Guilds
     *
     * The ready state used when the gateway is sending initial `GUILD_CREATE` events
     */
    INITIAL_GUILDS: 1,

    /**
     * Holding Events
     *
     * The ready state used when the client is holding events
     * https://aeracord.apixel.me/guides/holding-events
     */
    HOLDING_EVENTS: 2,

    /**
     * Ready
     *
     * The ready state used when the client is ready
     */
    READY: 3
} = {
    NONE: 0,
    INITIAL_GUILDS: 1,
    HOLDING_EVENTS: 2,
    READY: 3
};