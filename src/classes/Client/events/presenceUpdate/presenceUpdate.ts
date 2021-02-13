import { Client, Presence } from "../../../../internal";
import parsePresence from "../parsePresence";
import { RawPresenceData } from "../rawPresenceData";

export default function presenceUpdate(client: Client, rawData: RawPresenceData) {

    // Parse data
    const presence: Presence = parsePresence(client, rawData);

    // Emit event
    client.emit("presenceUpdate", presence, rawData);
}