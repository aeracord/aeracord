import { Base, Client, RawVanityInviteData, VanityInviteData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

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
     * To Data
     *
     * Create a `VanityInviteData` object from a `VanityInvite`
     *
     * @param vanityInvite The vanity invite
     *
     * @returns {VanityInviteData} The vanity invite data
     */
    static toData(vanityInvite: VanityInvite): VanityInviteData {
        return toData(vanityInvite);
    }

    /**
     * Update Object
     *
     * Update the `VanityInvite` object with data from a `VanityInviteData` object
     *
     * @param vanityInvite The vanity invite to update
     * @param vanityInviteData The data to update this vanity invite with
     */
    static _updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {
        updateObject(vanityInvite, vanityInviteData);
    }

    /**
     * Update Object From Data
     *
     * Update the `VanityInvite` object with data from a `VanityInviteData` object if it's cached
     *
     * @param client The client
     * @param vanityInviteData The vanity invite data
     *
     * @returns {VanityInvite | undefined} The vanity invite
     */
    static _updateObjectFromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite | undefined {
        return updateObjectFromData(client, vanityInviteData);
    }
}