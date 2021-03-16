import { Client, RawBanData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface BanData {
    guildID: string;
    user: UserData;
    reason?: string;
}

export default class Ban {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Guild ID
     *
     * The ID of the guild this ban is in
     */
    guildID: string;

    /**
     * User
     *
     * The user object for the user this ban is for
     */
    user: UserData;

    /**
     * Reason
     *
     * The ban's reason
     */
    reason?: string;

    /**
     * Ban
     *
     * @param client The client
     * @param banData Options to initialize this ban with
     * @param banData.guildID The ID of the guild this ban is in
     * @param banData.user The user object for the user this ban is for
     * @param banData.reason The ban's reason
     */
    constructor(client: Client, banData: BanData) {

        // Set data
        this.client = client;
        this.guildID = banData.guildID;
        this.user = banData.user;
        this.reason = banData.reason;
    }

    /**
     * From Raw Data
     *
     * Create a `BanData` object from a `RawBanData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {BanData} The ban data
     */
    static _fromRawData(rawData: RawBanData, guildID: string): BanData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Ban` from a `BanData` object
     *
     * @param banData The ban data
     *
     * @returns {Ban} The ban
     */
    static fromData(client: Client, banData: BanData): Ban {
        return fromData(client, banData);
    }
}