import { Client, READY_STATE_READY } from "../../../internal";
import { EventQueueEvent } from "../Client";
import event from "../event";

export default function ready(client: Client) {

    /**
     * Set Ready State
     *
     * This allows events to be processed
     */
    client._readyState = READY_STATE_READY;

    // Emit event
    client.emit("ready", client._readyData?.data, {
        rawData: client._readyData?.rawData
    });

    // Remove ready data
    delete client._readyData;

    // Process queued events
    client._eventQueue.forEach((e: EventQueueEvent) => event(client, e.type, e.data));
    client._eventQueue = [];
}