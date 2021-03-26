import { Base, Client, RawVanityInviteData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import updateObject from "./updateObject";

export interface VanityInviteData {
    guildID: string;
    code: string | null;
    uses: number;
}

export default class VanityInvite extends Base<VanityInvite> {

    /**
     * Guild ID
     *
     * The ID of the guild this vanity invite is for
     */
    get guildID(): string {
        return this.id;
    }

    /**
     * Code
     *
     * The vanity invite's code
     */
    code: string | null;

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

        // Super
        super(client, {
            id: vanityInviteData.guildID,
            cacheManager: client._vanityInvites
        });

        // Set data
        VanityInvite._updateObject(this, vanityInviteData);

        // Cache vanity invite
        this.client._vanityInvites.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `VanityInviteData` object from a `RawVanityInviteData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this vanity invite is for
     *
     * @returns {VanityInviteData} The vanity invite data
     */
    static _fromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInviteData {
        return fromRawData(client, rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `VanityInvite` from a `VanityInviteData` object
     *
     * @param client The client
     * @param vanityInviteData The vanity invite data
     *
     * @returns {VanityInvite} The vanity invite
     */
    static fromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite {
        return fromData(client, vanityInviteData);
    }

    /**
     * Update Object
     *
     * Update the `VanityInvite` object with data from a `VanityInviteData` object
     *
     * @param vanityInvite The vanity invite to update
     * @param vanityInviteData The data to update this vanityInvite with
     */
    static _updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {
        updateObject(vanityInvite, vanityInviteData);
    }
}