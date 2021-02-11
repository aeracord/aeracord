import { Client } from "./internal";

export default function debug(client: Client, info: string) {

    // Debug mode not enabled
    if (!client.debugMode) return;

    // Log
    console.log(`[Aeracord] ${info}`);
}