import { Client, Guild, GuildData, RawGuildData, WelcomeScreen } from "../../../../internal";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Get old guild data
    const oldGuild: Guild | undefined = client.guilds.get(rawData.id);
    const oldGuildData: GuildData | undefined = oldGuild && Guild.toData(oldGuild);

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, rawData);

    // Mark welcome screen as deleted
    if (!guild.welcomeScreen) {

        // Get welcome screen
        const welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(guild.id);

        // Mark as deleted
        if (welcomeScreen) welcomeScreen._markAsDeleted();
    }

    // Emit event
    client.emit("guildUpdate", guild, {
        rawData,
        oldGuildData
    });
}