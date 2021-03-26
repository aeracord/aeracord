import { Client, RawWelcomeScreenData, RawWelcomeScreenDataChannel, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawWelcomeScreenData, guildID: string): WelcomeScreenData {

    // Parse welcome screen data
    const welcomeScreenData: WelcomeScreenData = {
        guildID,
        description: rawData.description,
        channels: rawData.welcome_channels.map((c: RawWelcomeScreenDataChannel) => ({
            channelID: c.channel_id,
            description: c.description,
            emojiID: c.emoji_id,
            emojiName: c.emoji_name
        }))
    };

    // Create welcome screen object
    if (client._welcomeScreens.cacheAll) WelcomeScreen.fromData(client, welcomeScreenData);

    // Return
    return welcomeScreenData;
}