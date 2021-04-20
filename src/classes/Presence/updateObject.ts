import { Presence, PresenceData } from "../../internal";

export default function updateObject(presence: Presence, presenceData: PresenceData) {

    // If the `PresenceData` was fetched before the `Presence` object was last updated, dont update anything
    if (presenceData.fetchedAt < presence._lastUpdatedAt) return;

    // Unmark as deleted
    if (presence.deleted) presence._unmarkAsDeleted();

    // Set data
    presence.user = presenceData.user;
    presence.status = presenceData.status;
    presence.activities = presenceData.activities;
    presence.clientStatus = presenceData.clientStatus;
    presence._lastUpdatedAt = Date.now();
}