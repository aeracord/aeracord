import { Client, Presence, PresenceData } from "../../internal";

export default function fromData(client: Client, presenceData: PresenceData): Presence {

    // Create presence
    const presence: Presence = new Presence(client, presenceData);

    // Return
    return presence;
}