import { Client, Presence, PresenceData, RawPresenceData } from "../../../../internal";

export default function presenceUpdate(client: Client, rawData: RawPresenceData) {

    // Get old presence data
    const oldPresence: Presence | undefined = client.presences.get(rawData.user.id);
    const oldPresenceData: PresenceData | undefined = oldPresence && Presence.toData(oldPresence);

    // Parse presence
    const presence: Presence = Presence._fromRawData(client, rawData);

    // Emit event
    client.emit("presenceUpdate", presence, {
        rawData,
        user: client.users.get(presence.user.id),
        oldPresenceData
    });
}