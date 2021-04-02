import { Client, Guild, GuildData, RawGuildData, WelcomeScreen } from "../../../../internal";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Parse guild data
    const guildData: GuildData = Guild._fromRawData(client, rawData);

    // Mark welcome screen as deleted
    if (!guildData.welcomeScreen) {

        // Get welcome screen
        const welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(guildData.id);

        // Mark as deleted
        if (welcomeScreen) welcomeScreen._markAsDeleted();
    }

    // Emit event
    client.emit("guildUpdate", guildData, {
        rawData,
        guild: client.guilds.get(guildData.id)
    });
}