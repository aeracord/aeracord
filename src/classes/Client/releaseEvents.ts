import { Client, EventQueueEvent, ReadyStates } from "../../internal";
import event from "./event";

export default function releaseEvents(client: Client) {

    /**
     * Set Ready State
     *
     * This allows events to be processed
     */
    client._readyState = ReadyStates.READY;

    // Process queued events
    client._eventQueue.forEach((e: EventQueueEvent) => event(client, e.type, e.data));
    client._eventQueue = [];
}