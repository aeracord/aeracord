import { Base, Client, ModifyGuildWelcomeScreenData, RawWelcomeScreenData, READY_STATE_READY, WelcomeScreenChannel, WelcomeScreenData } from "../../internal";
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
            cacheManager: client._welcomeScreens
        });

        // Set data
        WelcomeScreen._updateObject(this, welcomeScreenData);

        /**
         * Cache Welcome Screen
         *
         * If we need to cache all welcome screens and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._welcomeScreens.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `WelcomeScreenData` object from a `RawWelcomeScreenData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this welcome screen is for
     *
     * @returns {WelcomeScreen} The welcome screen
     */
    static _fromRawData(client: Client, rawData: RawWelcomeScreenData, guildID: string): WelcomeScreen {
        return WelcomeScreen.fromData(client, WelcomeScreen._dataFromRawData(client, rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `WelcomeScreenData` object from a `RawWelcomeScreenData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this welcome screen is in
     *
     * @returns {WelcomeScreenData} The welcome screen data
     */
    static _dataFromRawData(client: Client, rawData: RawWelcomeScreenData, guildID: string): WelcomeScreenData {
        return dataFromRawData(client, rawData, guildID);
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
     * @private
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
     * @private
     * @param client The client
     * @param welcomeScreenData The welcome screen data
     */
    static _updateObjectFromData(client: Client, welcomeScreenData: WelcomeScreenData) {
        updateObjectFromData(client, welcomeScreenData);
    }

    /**
     * Cache
     *
     * Cache this `WelcomeScreen`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._welcomeScreens.cache(this.id, this, expiresIn);
    }

    /**
     * Edit
     *
     * Edit this welcome screen
     *
     * @param modifyGuildWelcomeScreenData The data to modify the welcome screen
     *
     * @returns {Promise<WelcomeScreen>} The modified welcome screen
     */
    edit(modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreen> {
        return this.client.modifyGuildWelcomeScreen(this.guildID, modifyGuildWelcomeScreenData);
    }
}