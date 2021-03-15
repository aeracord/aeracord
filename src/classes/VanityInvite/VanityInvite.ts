import { Client, RawVanityInviteData } from "../../internal";
import fromRawData from "./fromRawData";

export interface VanityInviteData {
    guildID: string;
    code?: string;
    uses: number;
}

export default class VanityInvite {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Guild ID
     *
     * The ID of the guild this vanity invite is for
     */
    guildID: string;

    /**
     * Code
     *
     * The vanity invite's code
     */
    code?: string;

    /**
     * Uses
     *
     * The amount of times this vanity invite link has been used
     */
    uses: number;

    /**
     * Vanity Invite
     *
     * @param client The client
     * @param vanityInviteData Options to initialize this vanity invite with
     * @param vanityInviteData.guildID The ID of the guild this vanity invite is for
     * @param vanityInviteData.code The vanity invite's code
     * @param vanityInviteData.uses The amount of times this vanity invite link has been used
     */
    constructor(client: Client, vanityInviteData: VanityInviteData) {

        // Set data
        this.client = client;
        this.guildID = vanityInviteData.guildID;
        this.code = vanityInviteData.code;
        this.uses = vanityInviteData.uses;
    }

    /**
     * From Raw Data
     *
     * Create a `VanityInvite` from a `RawVanityInviteData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {VanityInvite} The vanity invite
     */
    static _fromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInvite {
        return fromRawData(client, rawData, guildID);
    }
}