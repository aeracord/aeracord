import { Client, User } from "../../../../internal";
import { GuildBanRemoveData } from "./guildBanRemoveData";
import { RawGuildBanRemoveData } from "./rawGuildBanRemoveData";

export default function guildBanRemove(client: Client, rawData: RawGuildBanRemoveData) {

    // Parse data
    const data: GuildBanRemoveData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Emit event
    client.emit("guildBanRemove", data, {
        rawData,
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}