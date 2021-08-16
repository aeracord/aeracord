import { Client, HoldEventsTypes, ReadyStates } from "../../../internal";

export default function ready(client: Client) {

    // Set ready state
    client._readyState = ReadyStates.HOLDING_EVENTS;

    // If we dont need to hold events, release them
    if (client._holdEvents === HoldEventsTypes.NONE) client.releaseEvents();

    // Emit event
    client.emit("ready", client._readyData?.data, {
        rawData: client._readyData?.rawData
    });

    // Remove ready data
    delete client._readyData;
}