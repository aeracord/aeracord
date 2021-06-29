import { Client, CHANNEL_TYPE_NEWS_THREAD, CHANNEL_TYPE_PRIVATE_THREAD, CHANNEL_TYPE_PUBLIC_THREAD, ThreadChannelData } from "../../internal";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import updateObject from "./updateObject";

export type ThreadChannelType = typeof CHANNEL_TYPE_NEWS_THREAD | typeof CHANNEL_TYPE_PUBLIC_THREAD | typeof CHANNEL_TYPE_PRIVATE_THREAD;

export default class ThreadChannel extends TextBasedChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: ThreadChannelType;

    /**
     * Name
     *
     * The thread's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread is in
     */
    guildID: string;

    /**
     * Parent ID
     *
     * The ID of this thread's parent channel
     */
    parentID: string;

    /**
     * Creator ID
     *
     * The ID of the user that created this thread
     */
    creatorID: string;

    /**
     * Archived
     *
     * Whether or not this thread is archived
     */
    archived: boolean;

    /**
     * Auto Archived Duration
     *
     * The amount of time in minutes after inactivity that this thread will automatically be archived
     */
    autoArchivedDuration: number;

    /**
     * Archived At
     *
     * The timestamp for when this thread's archived status was last updated
     */
    archivedAt?: number;

    /**
     * Locked
     *
     * Whether or not this thread is locked
     */
    locked: boolean;

    /**
     * Message Count
     *
     * The approximate number of messages in this thread
     * This value stops counting at 50
     */
    messageCount: number;

    /**
     * Member Count
     *
     * The approximate number of members in this thread
     * This value stops counting at 50
     */
    memberCount: number;

    /**
     * Thread Channel
     *
     * @param client The client
     * @param threadChannelData Options to initialize this thread channel with
     * @param threadChannelData.name The thread's name
     * @param threadChannelData.guildID The ID of the guild this thread is in
     * @param threadChannelData.parentID The ID of this thread's parent channel
     * @param threadChannelData.creatorID The ID of the user that created this thread
     * @param threadChannelData.archived Whether or not this thread is archived
     * @param threadChannelData.autoArchivedDuration The amount of time in minutes after inactivity that this thread will automatically be archived
     * @param threadChannelData.archivedAt The timestamp for when this thread's archived status was last updated
     * @param threadChannelData.locked Whether or not this thread is locked
     * @param threadChannelData.messageCount The approximate number of messages in this thread
     * @param threadChannelData.memberCount The approximate number of members in this thread
     */
    constructor(client: Client, threadChannelData: ThreadChannelData) {

        // Super
        super(client, threadChannelData);

        // Set data
        ThreadChannel._updateObject(this, threadChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `ThreadChannel` object with data from a `ThreadChannelData` object
     *
     * @private
     * @param threadChannel The thread channel to update
     * @param threadChannelData The data to update the thread channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(threadChannel: ThreadChannel, threadChannelData: ThreadChannelData, fromConstructor?: boolean) {
        updateObject(threadChannel, threadChannelData, fromConstructor);
    }

    /**
     * Join
     *
     * Join this thread
     */
    join(): Promise<void> {
        return this.client.joinThread(this);
    }
}