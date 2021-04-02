import { Ban, Client, GuildBanAddData, RawGuildBanAddData, User } from "../../../../internal";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse data
    const data: GuildBanAddData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Get ban
    const ban: Ban | undefined = client.bans.get(data.guildID, data.user.id);

    // Unmark as deleted
    if (ban) ban._unmarkAsDeleted();

    // Emit event
    client.emit("guildBanAdd", data, {
        rawData,
        ban,
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}