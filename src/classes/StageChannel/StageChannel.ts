import { CacheInterface, Client, CHANNEL_TYPE_STAGE, Invite, PrivacyLevel, StageChannelData, StageInstance } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import updateObject from "./updateObject";

export interface CreateStageChannelInstanceData {
    topic: string;
    privacyLevel?: PrivacyLevel;
}

export default class StageChannel extends GuildChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_STAGE;

    /**
     * Invites
     *
     * The cache interface for the invites in this channel
     */
    invites: CacheInterface<Invite>;

    /**
     * Stage Channel
     *
     * @param client The client
     * @param stageChannelData Options to initialize this stage channel with
     */
    constructor(client: Client, stageChannelData: StageChannelData) {

        // Super
        super(client, stageChannelData);

        // Set data
        StageChannel._updateObject(this, stageChannelData, true);
        Object.defineProperty(this, "invites", {
            value: new CacheInterface<Invite>(this.client, {
                cacheManager: this.client._invites,
                match: (i: Invite) => i.channelID === this.id,
                fetchObject: async (id: string): Promise<Invite | undefined> => await this.client.getInvite(id)
            })
        });
    }

    /**
     * Update Object
     *
     * Update the `StageChannel` object with data from a `StageChannelData` object
     *
     * @private
     * @param stageChannel The stage channel to update
     * @param stageChannelData The data to update the stage channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(stageChannel: StageChannel, stageChannelData: StageChannelData, fromConstructor?: boolean) {
        updateObject(stageChannel, stageChannelData, fromConstructor);
    }

    /**
     * Create Stage Instance
     *
     * Create a stage instance in this stage channel
     *
     * @param createStageChannelInstanceData The data for the stage instance
     *
     * @returns {Promise<StageInstance>} The created stage instance
     */
    createStageInstance(createStageChannelInstanceData: CreateStageChannelInstanceData): Promise<StageInstance> {
        return this.client.createStageInstance({ channel: this, ...createStageChannelInstanceData });
    }

    /**
     * Get Invites
     *
     * Get this channel's invites
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getInvites(): Promise<Invite[]> {
        return this.client.getChannelInvites(this);
    }

    /**
     * Get Stage Instance
     *
     * Get this channel's stage instance
     *
     * @returns {Promise<StageInstance>} The stage instance
     */
    getStageInstance(): Promise<StageInstance | undefined> {
        return this.client.getStageInstance(this);
    }
}