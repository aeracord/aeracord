import { Client } from "../../internal";

export default function resume(client: Client) {

    /**
     * Resume
     * https://discord.com/developers/docs/topics/gateway#resuming
     */
    client._ws.send(JSON.stringify({
        op: 6,
        d: {
            token: client.token,
            session_id: client._sessionID,
            seq: client._sequence
        }
    }));
}