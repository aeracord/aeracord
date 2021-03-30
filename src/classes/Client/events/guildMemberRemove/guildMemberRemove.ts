import { Client, Member, User } from "../../../../internal";
import { GuildMemberRemoveData } from "./guildMemberRemoveData";
import { RawGuildMemberRemoveData } from "./rawGuildMemberRemoveData";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse data
    const data: GuildMemberRemoveData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Get member
    const member: Member | undefined = client.members.get(data.guildID, data.user.id);

    // Remove from cache
    if (member) member.uncache();

    // Emit event
    client.emit("guildMemberRemove", data, {
        rawData,
        member,
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id)
    });
}