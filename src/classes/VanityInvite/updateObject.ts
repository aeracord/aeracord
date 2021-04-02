import { VanityInvite, VanityInviteData } from "../../internal";

export default function updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {

    // Unmark as deleted
    if (vanityInvite.deleted) vanityInvite._unmarkAsDeleted();

    // Set data
    vanityInvite.code = vanityInviteData.code;
    vanityInvite.uses = vanityInviteData.uses;
}