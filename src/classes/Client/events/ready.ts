import { Client, HOLD_EVENTS_TYPE_NONE, READY_STATE_HOLDING_EVENTS } from "../../../internal";

export default function ready(client: Client) {

    // Set ready state
    client._readyState = READY_STATE_HOLDING_EVENTS;

    // If we dont need to hold events, release them
    if (client._holdEvents === HOLD_EVENTS_TYPE_NONE) client.releaseEvents();

    // Emit event
    client.emit("ready", client._readyData?.data, {
        rawData: client._readyData?.rawData
    });

    // Remove ready data
    delete client._readyData;
}