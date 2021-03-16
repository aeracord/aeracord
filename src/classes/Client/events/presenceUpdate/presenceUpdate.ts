import { Client, Presence, PresenceData, RawPresenceData } from "../../../../internal";

export default function presenceUpdate(client: Client, rawData: RawPresenceData) {

    // Parse presence data
    const presenceData: PresenceData = Presence._fromRawData(rawData);

    // Emit event
    client.emit("presenceUpdate", presenceData, rawData);
}