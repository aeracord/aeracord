import { VanityInvite, VanityInviteData } from "../../internal";

export default function toData(vanityInvite: VanityInvite): VanityInviteData {

    // Parse vanityInvite data
    return {
        guildID: vanityInvite.guildID,
        code: vanityInvite.code,
        uses: vanityInvite.uses
    };
}