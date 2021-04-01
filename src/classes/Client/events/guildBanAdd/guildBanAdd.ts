import { Client, GuildBanAddData, RawGuildBanAddData, User } from "../../../../internal";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse data
    const data: GuildBanAddData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Emit event
    client.emit("guildBanAdd", data, {
        rawData,
        ban: client.bans.get(data.guildID, data.user.id),
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}