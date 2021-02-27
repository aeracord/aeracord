import { Client, Presence, RawPresenceData } from "../../../../internal";

export default function presenceUpdate(client: Client, rawData: RawPresenceData) {

    // Parse data
    const presence: Presence = Presence._fromRawData(client, rawData);

    // Emit event
    client.emit("presenceUpdate", presence, rawData);
}