import { Client } from "../../internal";

export default function heartbeat(client: Client) {

    // Debug
    client._debug("Sent heartbeat");

    // Send heartbeat
    client.ws.send(JSON.stringify({
        op: 1,
        d: client.sequence || null
    }));
}