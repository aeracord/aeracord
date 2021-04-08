import { WelcomeScreen, WelcomeScreenChannel, WelcomeScreenData } from "../../internal";

export default function toData(welcomeScreen: WelcomeScreen): WelcomeScreenData {

    // Parse welcomeScreen data
    return {
        guildID: welcomeScreen.guildID,
        description: welcomeScreen.description,
        channels: welcomeScreen.channels.map((c: WelcomeScreenChannel) => ({
            channelID: c.channelID,
            description: c.description,
            emojiID: c.emojiID,
            emojiName: c.emojiName
        }))
    };
}