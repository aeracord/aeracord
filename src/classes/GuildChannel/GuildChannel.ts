import { CategoryChannel, CategoryChannelData, ChannelData, Client, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, NewsChannel, NewsChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData } from "../../internal";
import Channel from "../Channel/Channel";
import updateObject from "./updateObject";

export interface GuildChannelData extends ChannelData {
    name: string;
    guildID: string;
    position: number;
    permissionOverwrites: PermissionOverwrite[];
    parentID?: string;
}

export interface PermissionOverwrite {
    id: string;
    type: PermissionType;
    allow: string;
    deny: string;
}

export type PermissionType = typeof PERMISSION_TYPE_ROLE | typeof PERMISSION_TYPE_MEMBER;
export const PERMISSION_TYPE_ROLE = 0;
export const PERMISSION_TYPE_MEMBER = 1;

export type AnyGuildChannel = GuildChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel;

export type AnyGuildChannelData = GuildChannelData | TextChannelData | VoiceChannelData | CategoryChannelData | NewsChannelData | StoreChannelData;

export type GuildChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE;

export default class GuildChannel extends Channel {

    /**
     * Name
     *
     * The channel's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this channel is in
     */
    guildID: string;

    /**
     * Position
     *
     * The position of this channel
     */
    position: number;

    /**
     * Permission Overwrites
     *
     * The permission overwrites of this channel
     */
    permissionOverwrites: PermissionOverwrite[];

    /**
     * Parent ID
     *
     * The ID of this channel's parent channel
     */
    parentID?: string;

    /**
     * Guild Channel
     *
     * @param client The client
     * @param guildChannelData Options to initialize this guild channel with
     * @param guildChannelData.name The channel's name
     * @param guildChannelData.guildID The ID of the guild this channel is in
     * @param guildChannelData.position The position of this channel
     * @param guildChannelData.permissionOverwrites The permission overwrites of this channel
     * @param guildChannelData.parentID The ID of this channel's parent channel
     */
    constructor(client: Client, guildChannelData: GuildChannelData) {

        // Super
        super(client, guildChannelData);

        // Set data
        GuildChannel._updateObject(this, guildChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `GuildChannel` object with data from a `GuildChannelData` object
     *
     * @param guildChannel The guild channel to update
     * @param guildChannelData The data to update the guild channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(guildChannel: GuildChannel, guildChannelData: GuildChannelData, fromConstructor?: boolean) {
        updateObject(guildChannel, guildChannelData, fromConstructor);
    }
}