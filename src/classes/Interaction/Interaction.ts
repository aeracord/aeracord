import { Base, Client, InteractionCommandData, InteractionData, InteractionType, MemberData, RawInteractionData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class Interaction extends Base<Interaction> {

    /**
     * ID
     *
     * The interaction's ID
     */
    id: string;

    /**
     * Type
     *
     * The interaction's type
     */
    type: InteractionType;

    /**
     * Token
     *
     * The interaction's token
     */
    token: string;

    /**
     * Application ID
     *
     * The ID of the application that owns this interaction
     */
    applicationID: string;

    /**
     * Data
     *
     * The interaction's data
     */
    data: InteractionCommandData;

    /**
     * Guild ID
     *
     * The ID of the guild this interaction is in
     */
    guildID: string | null;

    /**
     * Channel ID
     *
     * The ID of the channel this interaction is in
     */
    channelID: string;

    /**
     * Member
     *
     * The member that created this interaction
     */
    member: MemberData | null;

    /**
     * Permissions
     *
     * The member's permissions including role permissions and channel overwrites
     */
    permissions: string | null;

    /**
     * User
     *
     * The user that created this interaction
     */
    user: UserData;

    /**
     * Interaction
     *
     * @param client The client
     * @param interactionData Options to initialize this interaction with
     * @param interactionData.id The interaction's ID
     * @param interactionData.type The interaction's type
     * @param interactionData.token The interaction's token
     * @param interactionData.applicationID The ID of the application that owns this interaction
     * @param interactionData.data The interaction's data
     * @param interactionData.guildID The ID of the guild this interaction is in
     * @param interactionData.channelID The ID of the channel this interaction is in
     * @param interactionData.member The member that created this interaction
     * @param interactionData.permissions The member's permissions including role permissions and channel overwrites
     * @param interactionData.user The user that created this interaction
     */
    constructor(client: Client, interactionData: InteractionData) {

        // Super
        super(client, {
            id: interactionData.id,
            cacheManager: client._interactions
        });

        // Set data
        Interaction._updateObject(this, interactionData);

        // Cache interaction
        this.client._interactions.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create an `InteractionData` object from a `RawInteractionData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {InteractionData} The interaction data
     */
    static _fromRawData(client: Client, rawData: RawInteractionData): InteractionData {
        return fromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create an `Interaction` from an `InteractionData` object
     *
     * @param client The client
     * @param interactionData The interaction data
     *
     * @returns {Interaction} The interaction
     */
    static fromData(client: Client, interactionData: InteractionData): Interaction {
        return fromData(client, interactionData);
    }

    /**
     * To Data
     *
     * Create an `InteractionData` object from an `Interaction`
     *
     * @param interaction The interaction
     *
     * @returns {InteractionData} The interaction data
     */
    static toData(interaction: Interaction): InteractionData {
        return toData(interaction);
    }

    /**
     * Update Object
     *
     * Update the `Interaction` object with data from an `InteractionData` object
     *
     * @param interaction The interaction to update
     * @param interactionData The data to update this interaction with
     */
    static _updateObject(interaction: Interaction, interactionData: InteractionData) {
        updateObject(interaction, interactionData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Interaction` object with data from an `InteractionData` object if it's cached
     *
     * @param client The client
     * @param interactionData The interaction data
     *
     * @returns {Interaction | undefined} The interaction
     */
    static _updateObjectFromData(client: Client, interactionData: InteractionData): Interaction | undefined {
        return updateObjectFromData(client, interactionData);
    }
}