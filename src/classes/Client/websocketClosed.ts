import { Client } from "../../internal";

export default function websocketClosed(client: Client, code: number, reason: string) {

    // Parse reason
    if (code === 4021) reason = "Reconnect requested by Discord";
    if ((code === 4022) || (code === 4023)) reason = "Session invalidated by Discord";
    if (code === 4024) reason = "Last heartbeat wasn't acknowledged";

    // Debug: Websocket closed
    client.emit("debug", `Websocket closed with code ${code} (${reason})`);

    // Clear data
    clearInterval(client._pingInterval);
    clearInterval(client._heartbeatInterval);
    client._heartbeatAcked = true;

    // Must start new session
    if (![4000, 4021, 4022].includes(code)) {

        // Debug: Must start new session
        client.emit("debug", "Must start new session");

        // Unset session ID
        delete client._sessionID;
    }

    // Exit process
    if ([4004, 4005, 4010, 4011, 4012, 4013, 4014].includes(code)) {

        // Debug: Exiting process
        client.emit("debug", "Exiting process");

        // Exit
        process.exit();
    }

    // Reconnect
    client.connect();
}