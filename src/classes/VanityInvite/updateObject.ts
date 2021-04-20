import { VanityInvite, VanityInviteData } from "../../internal";

export default function updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {

    // If the `VanityInviteData` was fetched before the `VanityInvite` object was last updated, dont update anything
    if (vanityInviteData.fetchedAt < vanityInvite._lastUpdatedAt) return;

    // Unmark as deleted
    if (vanityInvite.deleted) vanityInvite._unmarkAsDeleted();

    // Set data
    vanityInvite.code = vanityInviteData.code;
    vanityInvite.uses = vanityInviteData.uses;
    vanityInvite._lastUpdatedAt = Date.now();
}