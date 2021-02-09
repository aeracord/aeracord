import { Client } from "../../../../internal";
import { InviteDeleteData } from "./inviteDeleteData";
import { RawInviteDeleteData } from "./rawInviteDeleteData";

export default function inviteDelete(client: Client, rawData: RawInviteDeleteData) {

    // Parse data
    const data: InviteDeleteData = {
        code: rawData.code,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("inviteDelete", data, rawData);
}