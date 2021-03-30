import { Client, Presence, PresenceData } from "../../internal";

export default function updateObjectFromData(client: Client, presenceData: PresenceData): Presence | undefined {

    // Get presence from cache
    let presence: Presence | undefined = client.presences.get(presenceData.user.id);

    // Update presence object
    if (presence) Presence._updateObject(presence, presenceData);

    // Return
    return presence;
}