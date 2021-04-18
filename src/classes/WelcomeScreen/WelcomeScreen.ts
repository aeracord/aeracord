import { Base, Client, ModifyGuildWelcomeScreenData, RawWelcomeScreenData, WelcomeScreenChannel, WelcomeScreenData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class WelcomeScreen extends Base<WelcomeScreen> {

    /**
     * Guild ID
     *
     * The ID of the guild this welcome screen is for
     */
    get guildID(): string {
        return this.id;
    }

    /**
     * Description
     *
     * The welcome screen's description
     */
    description: string | null;

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

        // Super
        super(client, {
            id: welcomeScreenData.guildID,
            cacheManager: client._welcomeScreens,
            expiresFromCacheIn: client._welcomeScreens.cacheAll ? (client._welcomeScreens.cacheFor || null) : undefined
        });

        // Set data
        WelcomeScreen._updateObject(this, welcomeScreenData);

        // Cache welcome screen
        if (client._welcomeScreens.cacheAll) this.client._welcomeScreens.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `WelcomeScreenData` object from a `RawWelcomeScreenData` object
     *
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this welcome screen is for
     *
     * @returns {WelcomeScreen} The welcome screen
     */
    static _fromRawData(client: Client, rawData: RawWelcomeScreenData, guildID: string): WelcomeScreen {
        return WelcomeScreen.fromData(client, WelcomeScreen._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `WelcomeScreenData` object from a `RawWelcomeScreenData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this welcome screen is in
     *
     * @returns {WelcomeScreenData} The welcome screen data
     */
    static _dataFromRawData(rawData: RawWelcomeScreenData, guildID: string): WelcomeScreenData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `WelcomeScreen` from a `WelcomeScreenData` object
     *
     * @param client The client
     * @param welcomeScreenData The welcome screen data
     *
     * @returns {WelcomeScreen} The welcome screen
     */
    static fromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen {
        return fromData(client, welcomeScreenData);
    }

    /**
     * To Data
     *
     * Create a `WelcomeScreenData` object from a `WelcomeScreen`
     *
     * @param welcomeScreen The welcome screen
     *
     * @returns {WelcomeScreenData} The welcome screen data
     */
    static toData(welcomeScreen: WelcomeScreen): WelcomeScreenData {
        return toData(welcomeScreen);
    }

    /**
     * Update Object
     *
     * Update the `WelcomeScreen` object with data from a `WelcomeScreenData` object
     *
     * @param welcomeScreen The welcome screen to update
     * @param welcomeScreenData The data to update this welcome screen with
     */
    static _updateObject(welcomeScreen: WelcomeScreen, welcomeScreenData: WelcomeScreenData) {
        updateObject(welcomeScreen, welcomeScreenData);
    }

    /**
     * Update Object From Data
     *
     * Update the `WelcomeScreen` object with data from a `WelcomeScreenData` object if it's cached
     *
     * @param client The client
     * @param welcomeScreenData The welcome screen data
     *
     * @returns {WelcomeScreen | undefined} The welcome screen
     */
    static _updateObjectFromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen | undefined {
        return updateObjectFromData(client, welcomeScreenData);
    }

    /**
     * Edit
     *
     * Edit this welcome screen
     *
     * @param modifyGuildWelcomeScreenData The data to modify the welcome screen
     *
     * @returns {Promise<WelcomeScreenData>} The modified welcome screen's data
     */
    edit(modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreenData> {
        return this.client.modifyGuildWelcomeScreen(this.guildID, modifyGuildWelcomeScreenData);
    }
}