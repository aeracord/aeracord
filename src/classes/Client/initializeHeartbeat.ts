import { Client } from "../../internal";
import heartbeat from "./heartbeat";

export default function initializeHeartbeat(client: Client, interval: number) {

    // Debug
    client._debug("Initialized heartbeat");

    // Set interval
    client._heartbeatInterval = setInterval(() => heartbeat(client), interval);
}