/**
 * Ready State
 *
 * The client's ready states
 */
export type ReadyState = typeof READY_STATE_NONE | typeof READY_STATE_INITIAL_GUILDS | typeof READY_STATE_HOLDING_EVENTS | typeof READY_STATE_READY;

/**
 * Ready State: None
 *
 * The ready state used when the client is connecting to the gateway
 */
export const READY_STATE_NONE = 0;

/**
 * Ready State: Initial Guilds
 *
 * The ready state used when the gateway is sending initial `GUILD_CREATE` events
 */
export const READY_STATE_INITIAL_GUILDS = 1;

/**
 * Ready State: Holding Events
 *
 * The ready state used when the client is holding events
 * https://aeracord.apixel.me/guides/holding-events
 */
export const READY_STATE_HOLDING_EVENTS = 2;

/**
 * Ready State: Ready
 *
 * The ready state used when the client is ready
 */
export const READY_STATE_READY = 3;