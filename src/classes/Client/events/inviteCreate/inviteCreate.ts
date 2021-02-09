import { Client, Invite } from "../../../../internal";
import parseInvite from "../parseInvite";
import { RawInviteData } from "../rawInviteData";

export default function inviteCreate(client: Client, rawData: RawInviteData) {

    // Parse invite
    const invite: Invite = parseInvite(client, rawData);

    // Emit event
    client.emit("inviteCreate", invite, rawData);
}