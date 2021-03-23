import { RawWelcomeScreenData, RawWelcomeScreenDataChannel, WelcomeScreenData } from "../../internal";

export default function fromRawData(rawData: RawWelcomeScreenData, guildID: string): WelcomeScreenData {

    // Parse welcome screen data
    return {
        guildID,
        description: rawData.description,
        channels: rawData.welcome_channels.map((c: RawWelcomeScreenDataChannel) => ({
            channelID: c.channel_id,
            description: c.description,
            emojiID: c.emoji_id,
            emojiName: c.emoji_name
        }))
    };
}