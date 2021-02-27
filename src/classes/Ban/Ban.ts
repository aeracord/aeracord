import { Client, RawBanData, User } from "../../internal";
import fromRawData from "./fromRawData";

export interface BanData {
    guildID: string;
    user: User;
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
    user: User;

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
     * Create an `Ban` from a `RawBanData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Ban} The ban
     */
    static _fromRawData = (client: Client, rawData: RawBanData, guildID: string): Ban => fromRawData(client, rawData, guildID);
}