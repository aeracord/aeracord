import { Client } from "../../internal";
import heartbeat from "./heartbeat";

export default function initializeHeartbeat(client: Client, interval: number) {

    // Debug: Initializing heartbeat
    client.emit("debug", "Initializing heartbeat");

    // Set interval
    client._heartbeatInterval = setInterval(() => heartbeat(client), interval);
}