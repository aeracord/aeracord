import { Client } from "../../internal";

export default function ping(client: Client) {

    // Set last ping timestamp
    client._lastPingTimestamp = Date.now();

    // Ping
    client._ws.ping();
}