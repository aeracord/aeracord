// Client
export {
    default as Client,
    ACTIVITY_TYPE_COMPETING,
    ACTIVITY_TYPE_CUSTOM,
    ACTIVITY_TYPE_LISTENING,
    ACTIVITY_TYPE_PLAYING,
    ACTIVITY_TYPE_STREAMING,
    ActivityType,
    BotActivity,
    BotActivityType,
    ClientData,
    Presence,
    Status
} from "./classes/Client/Client";
export { Intent } from "./classes/Client/connect";
export { ReadyData } from "./classes/Client/events/ready/readyData";