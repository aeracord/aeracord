import { Client, PrivacyLevel, RawStageInstanceData, StageInstanceData, UpdateStageInstanceData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

export default class StageInstance {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The stage instance's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this stage instance is in
     */
    guildID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this stage instance is in
     */
    channelID: string;

    /**
     * Topic
     *
     * The stage instance's topic
     */
    topic: string;

    /**
     * Privacy Level
     *
     * The stage instance's privacy level
     */
    privacyLevel: PrivacyLevel;

    /**
     * Discoverable Disabled
     *
     * Whether or not discovery is disabled for the stage instance
     */
    discoverableDisabled: boolean;

    /**
     * Stage Instance
     *
     * @param client The client
     * @param stageInstanceData Options to initialize this stage instance with
     * @param stageInstanceData.id The stage instance's ID
     * @param stageInstanceData.guildID The ID of the guild this stage instance is in
     * @param stageInstanceData.channelID The ID of the channel this stage instance is in
     * @param stageInstanceData.topic The stage instance's topic
     * @param stageInstanceData.privacyLevel The stage instance's privacy level
     * @param stageInstanceData.discoverableDisabled Whether or not discovery is disabled for the stage instance
     */
    constructor(client: Client, stageInstanceData: StageInstanceData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.id = stageInstanceData.id;
        this.guildID = stageInstanceData.guildID;
        this.channelID = stageInstanceData.channelID;
        this.topic = stageInstanceData.topic;
        this.privacyLevel = stageInstanceData.privacyLevel;
        this.discoverableDisabled = stageInstanceData.discoverableDisabled;
    }

    /**
     * From Raw Data
     *
     * Create a `StageInstanceData` object from a `RawStageInstanceData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {StageInstance} The stage instance
     */
    static _fromRawData(client: Client, rawData: RawStageInstanceData): StageInstance {
        return StageInstance.fromData(client, StageInstance._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `StageInstanceData` object from a `RawStageInstanceData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {StageInstanceData} The stage instance data
     */
    static _dataFromRawData(rawData: RawStageInstanceData): StageInstanceData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `StageInstance` from a `StageInstanceData` object
     *
     * @param client The client
     * @param stageInstanceData The stage instance data
     *
     * @returns {StageInstance} The stage instance
     */
    static fromData(client: Client, stageInstanceData: StageInstanceData): StageInstance {
        return fromData(client, stageInstanceData);
    }

    /**
     * To Data
     *
     * Create a `StageInstanceData` object from a `StageInstance`
     *
     * @param stageInstance The stage instance
     *
     * @returns {StageInstanceData} The stage instance data
     */
    static toData(stageInstance: StageInstance): StageInstanceData {
        return toData(stageInstance);
    }

    /**
     * Edit
     *
     * Edit this stage instance
     *
     * @param updateStageInstanceData The data to update the stage instance
     *
     * @returns {Promise<StageInstance>} The updated stage instance
     */
    edit(updateStageInstanceData: UpdateStageInstanceData): Promise<StageInstance> {
        return this.client.updateStageInstance(this.channelID, updateStageInstanceData);
    }

    /**
     * End
     *
     * End this stage instance
     */
    delete(): Promise<void> {
        return this.client.deleteStageInstance(this.channelID);
    }
}