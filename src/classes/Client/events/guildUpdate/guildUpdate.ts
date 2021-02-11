import { Client, Guild } from "../../../../internal";
import parseGuild from "../parseGuild";
import { RawGuildData } from "../rawGuildData";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Parse guild
    const guild: Guild = parseGuild(client, rawData);

    // Emit event
    client.emit("guildUpdate", guild, rawData);
}