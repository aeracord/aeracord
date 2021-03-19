import { Presence, PresenceData } from "../../internal";

export default function updateObject(presence: Presence, presenceData: PresenceData) {

    // Set data
    presence.user = presenceData.user;
    presence.status = presenceData.status;
    presence.activities = presenceData.activities;
    presence.clientStatus = presenceData.clientStatus;
}