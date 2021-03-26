import { Client, User } from "../../../../internal";
import { GuildBanAddData } from "./guildBanAddData";
import { RawGuildBanAddData } from "./rawGuildBanAddData";

export default function guildBanAdd(client: Client, rawData: RawGuildBanAddData) {

    // Parse data
    const data: GuildBanAddData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Emit event
    client.emit("guildBanAdd", data, {
        rawData,
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}