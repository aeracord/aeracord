import { Presence, PresenceData } from "../../internal";

export default function updateObject(presence: Presence, presenceData: PresenceData) {

    // Unmark as deleted
    if (presence.deleted) presence._unmarkAsDeleted();

    // Set data
    presence.user = presenceData.user;
    presence.status = presenceData.status;
    presence.activities = presenceData.activities;
    presence.clientStatus = presenceData.clientStatus;
}