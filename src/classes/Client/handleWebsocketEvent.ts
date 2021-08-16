import { Client } from "../../internal";
import event from "./event";
import heartbeat from "./heartbeat";
import initializeHeartbeat from "./initializeHeartbeat";

export default function handleWebsocketEvent(client: Client, rawPacket: string) {

    // Parse packet
    const packet: any = JSON.parse(rawPacket);

    // Update sequence
    if (packet.s) client._sequence = packet.s;

    /**
     * Events
     * https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events
     */
    if (packet.op === 0) event(client, packet.t, packet.d);

    /**
     * Heartbeat
     * https://discord.com/developers/docs/topics/gateway#heartbeat
     */
    else if (packet.op === 1) {

        // Debug: Opcode 1
        client.emit("debug", "Opcode 1 (Heartbeat requested)");

        // Send heartbeat
        heartbeat(client);
    }

    /**
     * Reconnect
     * https://discord.com/developers/docs/topics/gateway#reconnect
     */
    else if (packet.op === 7) {

        // Debug: Opcode 7
        client.emit("debug", "Opcode 7 (Reconnect requested by Discord)");

        // Close websocket
        client._ws.close(4021, "Reconnect requested by Discord");
    }

    /**
     * Invalid session
     * https://discord.com/developers/docs/topics/gateway#invalid-session
     */
    else if (packet.op === 9) {

        // Debug: Opcode 9
        client.emit("debug", "Opcode 9 (Invalid session)");

        // The session can be resumed
        if (packet.d) client._ws.close(4022, "Session invalidated by Discord");

        // A new session needs to be started
        else client._ws.close(4023, "Session invalidated by Discord");
    }

    /**
     * Hello
     * https://discord.com/developers/docs/topics/gateway#hello
     */
    else if (packet.op === 10) {

        // Debug: Opcode 10
        client.emit("debug", "Opcode 10 (Hello)");

        // Initialize heartbeat
        initializeHeartbeat(client, packet.d.heartbeat_interval);
    }

    /**
     * Heartbeat ACK
     * https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
     */
    else if (packet.op === 11) {

        // Debug: Heartbeat acked
        client.emit("debug", "Heartbeat acknowledged");

        // Set heartbeat acked
        client._heartbeatAcked = true;
    }
}