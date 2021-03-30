import { Client, Presence, PresenceData } from "../../internal";

export default function fromData(client: Client, presenceData: PresenceData): Presence {

    // Update cached presence
    let presence: Presence | undefined = Presence._updateObjectFromData(client, presenceData);

    // Create presence
    if (!presence) presence = new Presence(client, presenceData);

    // Return
    return presence;
}