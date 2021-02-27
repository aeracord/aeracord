import { Client, RawWelcomeScreenData, RawWelcomeScreenDataChannel, WelcomeScreen } from "../../internal";

export default function fromRawData(client: Client, rawData: RawWelcomeScreenData, guildID: string): WelcomeScreen {

    // Parse welcome screen
    const welcomeScreen: WelcomeScreen = new WelcomeScreen(client, {
        guildID,
        description: rawData.description || undefined,
        channels: rawData.welcome_channels.map((c: RawWelcomeScreenDataChannel) => ({
            channelID: c.channel_id,
            description: c.description,
            emojiID: c.emoji_id || undefined,
            emojiName: c.emoji_name || undefined
        }))
    });

    // Return
    return welcomeScreen;
}