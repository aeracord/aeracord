import { Client, Presence, PresenceData, RawPresenceData } from "../../../../internal";

export default function presenceUpdate(client: Client, rawData: RawPresenceData) {

    // Parse presence data
    const presenceData: PresenceData = Presence._fromRawData(client, rawData);

    // Emit event
    client.emit("presenceUpdate", presenceData, {
        rawData,
        presence: client.presences.get(presenceData.user.id),
        user: client.users.get(presenceData.user.id)
    });
}