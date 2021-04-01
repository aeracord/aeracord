import { Client, Invite, InviteDeleteData, RawInviteDeleteData } from "../../../../internal";

export default function inviteDelete(client: Client, rawData: RawInviteDeleteData) {

    // Parse data
    const data: InviteDeleteData = {
        code: rawData.code,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id
    };

    // Get invite
    const invite: Invite | undefined = client.invites.get(data.code);

    // Remove from cache
    if (invite) invite.uncache();

    // Emit event
    client.emit("inviteDelete", data, {
        rawData,
        invite,
        guild: client.guilds.get(data.guildID),
        channel: client.channels.get(data.channelID)
    });
}