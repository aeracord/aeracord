import { Client, Presence, PresenceData } from "../../internal";

export default function fromData(client: Client, presenceData: PresenceData): Presence {

    // Get presence from cache
    let presence: Presence | undefined = client.presences.get(presenceData.user.id);

    // Create presence
    if (!presence) presence = new Presence(client, presenceData);

    // Return
    return presence;
}