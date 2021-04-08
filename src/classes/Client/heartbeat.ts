import { Client } from "../../internal";

export default function heartbeat(client: Client) {

    // If the last heartbeat hasnt been acknowledged, close the connection
    if (!client._heartbeatAcked) return client._ws.close(4024, "Last heartbeat wasn't acknowledged");

    // Set heartbeat acked
    client._heartbeatAcked = false;

    // Send heartbeat
    client._ws.send(JSON.stringify({
        op: 1,
        d: client._sequence || null
    }));
}