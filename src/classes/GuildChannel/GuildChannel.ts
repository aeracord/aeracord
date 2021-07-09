import { CategoryChannel, CategoryChannelData, Client, CreateChannelInviteData, CHANNEL_TYPE_CATEGORY, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_STAGE, CHANNEL_TYPE_STORE, CHANNEL_TYPE_TEXT, CHANNEL_TYPE_VOICE, EditChannelPermissionsData, GuildChannelData, Invite, ModifyChannelData, NewsChannel, NewsChannelData, PermissionOverwrite, RoleResolvable, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, UserResolvable, VoiceChannel, VoiceChannelData } from "../../internal";
import Channel from "../Channel/Channel";
import updateObject from "./updateObject";

export type AnyGuildChannel = TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel | StageChannel;

export type AnyGuildChannelData = TextChannelData | VoiceChannelData | CategoryChannelData | NewsChannelData | StoreChannelData | StageChannelData;

export type GuildChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE | typeof CHANNEL_TYPE_STAGE;

export default class GuildChannel extends Channel {

    /**
     * Type
     *
     * The channel's type
     */
    type: GuildChannelType;

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
    parentID: string | null;

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
     * @private
     * @param guildChannel The guild channel to update
     * @param guildChannelData The data to update the guild channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(guildChannel: GuildChannel, guildChannelData: GuildChannelData, fromConstructor?: boolean) {
        updateObject(guildChannel, guildChannelData, fromConstructor);
    }

    /**
     * Create Invite
     *
     * Create an invite in this channel
     *
     * @param createChannelInviteData The data for the invite
     * @param reason The reason for creating the invite
     *
     * @returns {Promise<Invite>} The invite
     */
    createInvite(createChannelInviteData?: CreateChannelInviteData, reason?: string): Promise<Invite> {
        return this.client.createChannelInvite(this as AnyGuildChannel, createChannelInviteData, reason);
    }

    /**
     * Delete Permission
     *
     * Delete a permission from this channel
     *
     * @param roleOrUser The role or user's permissions to delete
     */
    deletePermission(roleOrUser: RoleResolvable | UserResolvable): Promise<void> {
        return this.client.deleteChannelPermission(this as AnyGuildChannel, roleOrUser);
    }

    /**
     * Edit Permissions
     *
     * Edit the permissions of this channel
     *
     * @param roleOrUser The role or user's permissions to edit
     * @param editChannelPermissionsData The data for editing the channel permissions
     */
    editPermissions(roleOrUser: RoleResolvable | UserResolvable, editChannelPermissionsData: EditChannelPermissionsData): Promise<void> {
        return this.client.editChannelPermissions(this as AnyGuildChannel, roleOrUser, editChannelPermissionsData);
    }

    /**
     * Edit
     *
     * Edit this channel
     *
     * @param modifyChannelData The data to modify the channel
     * @param reason The reason for modifying this channel
     *
     * @returns {Promise<AnyGuildChannel>} The modified channel
     */
    edit(modifyChannelData: ModifyChannelData, reason?: string): Promise<AnyGuildChannel> {
        return this.client.modifyChannel(this as AnyGuildChannel, modifyChannelData, reason);
    }
}