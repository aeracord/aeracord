import { Client } from "../../internal";

export default function websocketClosed(client: Client, code: number, reason: string) {

    // Parse reason
    if (code === 4021) reason = "Reconnect requested by Discord";
    if ((code === 4022) || (code === 4023)) reason = "Session invalidated by Discord";
    if (code === 4024) reason = "Last heartbeat wasn't acknowledged";

    // Clear intervals
    clearInterval(client._pingInterval);
    clearInterval(client._heartbeatInterval);

    // Must start new session
    if (![4000, 4021, 4022].includes(code)) delete client._sessionID;

    // Exit process
    if ([4004, 4005, 4010, 4011, 4012, 4013, 4014].includes(code)) {

        // Exit
        process.exit();
    }

    // Reconnect
    client._connect();
}