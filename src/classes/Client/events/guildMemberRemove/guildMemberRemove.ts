import { Client, User } from "../../../../internal";
import { GuildMemberRemoveData } from "./guildMemberRemoveData";
import { RawGuildMemberRemoveData } from "./rawGuildMemberRemoveData";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse data
    const data: GuildMemberRemoveData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(rawData.user)
    };

    // Emit event
    client.emit("guildMemberRemove", data, {
        rawData,
        member: client.members.get(data.guildID, data.user.id),
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}