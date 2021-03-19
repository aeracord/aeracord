import { VanityInvite, VanityInviteData } from "../../internal";

export default function updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {

    // Set data
    vanityInvite.code = vanityInviteData.code;
    vanityInvite.uses = vanityInviteData.uses;
}