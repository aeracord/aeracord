import { Client, RawWelcomeScreenData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface WelcomeScreenData {
    guildID: string;
    description?: string;
    channels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
    channelID: string;
    description: string;
    emojiID?: string;
    emojiName?: string;
}

export default class WelcomeScreen {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Guild ID
     *
     * The ID of the guild this welcome screen is for
     */
    guildID: string;

    /**
     * Description
     *
     * The welcome screen's description
     */
    description?: string;

    /**
     * Channels
     *
     * The welcome screen's channels
     */
    channels: WelcomeScreenChannel[];

    /**
     * Welcome Screen
     *
     * @param client The client
     * @param welcomeScreenData Options to initialize this welcome screen with
     * @param welcomeScreenData.guildID The ID of the guild this welcome screen is for
     * @param welcomeScreenData.description The welcome screen's description
     * @param welcomeScreenData.channels The welcome screen's channels
     */
    constructor(client: Client, welcomeScreenData: WelcomeScreenData) {

        // Set data
        this.client = client;
        this.guildID = welcomeScreenData.guildID;
        this.description = welcomeScreenData.description;
        this.channels = welcomeScreenData.channels;
    }

    /**
     * From Raw Data
     *
     * Create a `WelcomeScreenData` object from a `RawWelcomeScreenData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {WelcomeScreenData} The welcome screen data
     */
    static _fromRawData(rawData: RawWelcomeScreenData, guildID: string): WelcomeScreenData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `WelcomeScreen` from a `WelcomeScreenData` object
     *
     * @param welcomeScreenData The welcome screen data
     *
     * @returns {WelcomeScreen} The welcome screen
     */
    static fromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen {
        return fromData(client, welcomeScreenData);
    }
}